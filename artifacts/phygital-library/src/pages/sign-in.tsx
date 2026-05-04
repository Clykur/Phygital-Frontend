import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import { userFacingErrorMessage } from "@/lib/error-messages";
import { HUB_KIND_OPTIONS, type HubKindValue } from "@/lib/hub-display";
import { afterAuthPath, afterHubRegisterPath } from "@/lib/sign-in-return";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function SignInPage() {
  const [, setLocation] = useLocation();
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [registerAs, setRegisterAs] = useState<"student" | "hub">("student");
  const [hubName, setHubName] = useState("");
  const [hubLocation, setHubLocation] = useState("");
  const [hubKind, setHubKind] = useState<HubKindValue>("other");
  const [busy, setBusy] = useState(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const signedIn = await login(email, password);
      toast.success("Signed in");
      setLocation(afterAuthPath(signedIn));
    } catch (err) {
      toast.error(userFacingErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (registerAs === "hub") {
        const created = await register({
          name,
          email,
          password,
          accountType: "hub",
          hubName: hubName.trim(),
          hubLocation: hubLocation.trim(),
          hubKind,
        });
        if (created.hubStaffHubIds.length === 0) {
          toast.error(
            "Hub portal access was not attached to your account. Restart the API dev server (so it rebuilds), then register again with a new email — or ask an admin to add a hub_admin membership for you.",
            { duration: 12_000 },
          );
          setLocation(afterAuthPath(created));
          return;
        }
        toast.success("Hub created — you’re the hub lead");
        setLocation(afterHubRegisterPath(created));
      } else {
        const created = await register({ name, email, password });
        toast.success("Account created");
        setLocation(afterAuthPath(created));
      }
    } catch (err) {
      toast.error(userFacingErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background pt-28 pb-20">
      <div className="mx-auto max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-amber-600/90">
            Phygital Library
          </p>
          <h1 className="mt-4 font-serif text-3xl font-light tracking-tight text-foreground">
            Student Library Network
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to borrow, request titles, and trade on the campus shelf.
          </p>

          <Tabs defaultValue="signin" className="mt-10">
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted/60 p-1">
              <TabsTrigger value="signin" className="rounded-full">
                Sign in
              </TabsTrigger>
              <TabsTrigger value="register" className="rounded-full">
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="mt-8">
              <form onSubmit={onLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="si-email">Email</Label>
                  <Input
                    id="si-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="si-password">Password</Label>
                  <Input
                    id="si-password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-card"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={busy}
                  className="h-12 w-full rounded-full bg-foreground text-background"
                >
                  {busy ? "…" : "Continue"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register" className="mt-8">
              <form onSubmit={onRegister} className="space-y-5">
                <div className="space-y-3">
                  <Label className="text-foreground">I am signing up as</Label>
                  <RadioGroup
                    value={registerAs}
                    onValueChange={(v) => setRegisterAs(v as "student" | "hub")}
                    className="grid gap-3"
                  >
                    <label
                      className={cn(
                        "flex cursor-pointer gap-3 rounded-xl border p-3 text-left transition-colors",
                        registerAs === "student"
                          ? "border-amber-500/60 bg-amber-500/5"
                          : "border-border bg-card hover:bg-muted/40",
                      )}
                    >
                      <RadioGroupItem value="student" id="reg-student" className="mt-0.5" />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">Student</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          Borrow, buy, and sell books. You stay a standard member account.
                        </span>
                      </span>
                    </label>
                    <label
                      className={cn(
                        "flex cursor-pointer gap-3 rounded-xl border p-3 text-left transition-colors",
                        registerAs === "hub"
                          ? "border-amber-500/60 bg-amber-500/5"
                          : "border-border bg-card hover:bg-muted/40",
                      )}
                    >
                      <RadioGroupItem value="hub" id="reg-hub" className="mt-0.5" />
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">
                          Library hub (desk)
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          Register a lending location. You become hub lead and can use the desk
                          tools for this hub.
                        </span>
                      </span>
                    </label>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-name">
                    {registerAs === "hub" ? "Your name" : "Name"}
                  </Label>
                  <Input
                    id="reg-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-card"
                  />
                </div>
                {registerAs === "hub" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="reg-hub-name">Hub / library name</Label>
                      <Input
                        id="reg-hub-name"
                        value={hubName}
                        onChange={(e) => setHubName(e.target.value)}
                        required
                        placeholder="e.g. North Campus Reading Room"
                        className="bg-card"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-hub-location">Location</Label>
                      <Input
                        id="reg-hub-location"
                        value={hubLocation}
                        onChange={(e) => setHubLocation(e.target.value)}
                        required
                        placeholder="City, campus, or address"
                        className="bg-card"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-hub-kind">Hub type</Label>
                      <Select
                        value={hubKind}
                        onValueChange={(v) => setHubKind(v as HubKindValue)}
                      >
                        <SelectTrigger id="reg-hub-kind" className="bg-card">
                          <SelectValue placeholder="Choose type" />
                        </SelectTrigger>
                        <SelectContent>
                          {HUB_KIND_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : null}
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password (min 8)</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="bg-card"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={busy}
                  className="h-12 w-full rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400"
                >
                  {busy ? "…" : registerAs === "hub" ? "Create hub & account" : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            <Link href="/" className="text-amber-600 hover:text-amber-700">
              ← Back to home
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
