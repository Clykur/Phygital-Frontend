import "./load-env";
import app from "./app";
import { expireAllStaleBookRequests } from "./lib/expire-book-requests";
import { processNotificationQueueWorker } from "./lib/notification-queue";
import { expireStaleAssignmentsWorker } from "./lib/expire-stale-assignments";
import { runHubReconciliation } from "./lib/hub-reconciliation";
import { logger } from "./lib/logger";
import { ensurePublicReadableIds } from "./lib/public-ids";
import { seedIfEmpty } from "./seed";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const preferredPort = Number(rawPort);

if (Number.isNaN(preferredPort) || preferredPort <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const isProd = process.env["NODE_ENV"] === "production";
/** In dev, bind only to `PORT` so Vite + `VITE_API_PROXY` stay in sync. Set `PORT_FLEXIBLE=1` to try the next ports (then update `VITE_API_PROXY` to the logged URL). */
const maxPortAttempts =
  isProd ? 1 : process.env["PORT_FLEXIBLE"] === "1" ? 25 : 1;

function listenPort(port: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const server = app.listen(port);
    server.once("listening", () => resolve());
    server.once("error", reject);
  });
}

async function start(): Promise<void> {
  for (let i = 0; i < maxPortAttempts; i++) {
    const port = preferredPort + i;
    try {
      await listenPort(port);
      logger.info({ port }, "Server listening");
      if (!isProd && port !== preferredPort) {
        logger.warn(
          {
            requested: preferredPort,
            bound: port,
            viteProxyHint: `http://127.0.0.1:${port}`,
          },
          "Port was in use — using alternate. Point VITE_API_PROXY in phygital-library/.env.local at this URL.",
        );
      }
      if (process.env["AUTO_SEED"] === "1") {
        await seedIfEmpty();
      }
      await ensurePublicReadableIds();
      const expiryMs = 10 * 60 * 1000;
      const runExpirySweep = () => {
        void expireAllStaleBookRequests().catch((e) =>
          logger.error({ err: e }, "book request expiry sweep error"),
        );
      };
      setInterval(() => {
        runExpirySweep();
      }, expiryMs);
      runExpirySweep();

      const notificationWorkerMs = Number(process.env["NOTIFICATION_WORKER_MS"] ?? 5000);
      let notificationWorkerBusy = false;
      const runNotificationWorker = () => {
        if (notificationWorkerBusy) return;
        notificationWorkerBusy = true;
        void processNotificationQueueWorker()
          .catch((e) => logger.error({ err: e }, "notification worker error"))
          .finally(() => {
            notificationWorkerBusy = false;
          });
      };
      setInterval(
        runNotificationWorker,
        Number.isFinite(notificationWorkerMs) && notificationWorkerMs >= 2000 ? notificationWorkerMs : 5000,
      );
      runNotificationWorker();

      let staleAssignmentsWorkerBusy = false;
      const runStaleAssignmentsWorker = () => {
        if (staleAssignmentsWorkerBusy) return;
        staleAssignmentsWorkerBusy = true;
        void expireStaleAssignmentsWorker()
            .catch((e: any) =>
              logger.error({ err: e }, "stale assignments worker error")
            )
          .finally(() => {
            staleAssignmentsWorkerBusy = false;
          });
      };
      setInterval(runStaleAssignmentsWorker, 300_000); // 5 minutes
      runStaleAssignmentsWorker();

      const reconcileMs = Number(process.env["HUB_RECONCILE_MS"] ?? 180_000);
      setInterval(() => {
        void runHubReconciliation().catch((e) => logger.error({ err: e }, "hub reconciliation error"));
      }, Number.isFinite(reconcileMs) && reconcileMs >= 60_000 ? reconcileMs : 180_000);
      void runHubReconciliation().catch((e) => logger.error({ err: e }, "hub reconciliation error"));
      return;
    } catch (e) {
      const err = e as NodeJS.ErrnoException;
      if (err.code === "EADDRINUSE" && !isProd && i < maxPortAttempts - 1) {
        logger.warn({ port }, "Port in use, trying next");
        continue;
      }
      if (err.code === "EADDRINUSE" && !isProd && maxPortAttempts === 1) {
        logger.error(
          {
            port: preferredPort,
            hint: `Another process is using port ${preferredPort} (often a stale API). Stop it, or set PORT_FLEXIBLE=1 and align phygital-library/.env.local VITE_API_PROXY with the port the server logs.`,
          },
          "Port in use — refusing alternate port in development",
        );
      } else {
        logger.error({ err: e }, "Error listening on port");
      }
      process.exit(1);
    }
  }
}

void start();