import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center border border-border bg-white">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-foreground">
                  <path
                    d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H10.5C11.3284 3 12 3.67157 12 4.5V19.5C12 20.3284 11.3284 21 10.5 21H5.5C4.67157 21 4 20.3284 4 19.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 4.5C12 3.67157 12.6716 3 13.5 3H18.5C19.3284 3 20 3.67157 20 4.5V19.5C20 20.3284 19.3284 21 18.5 21H13.5C12.6716 21 12 20.3284 12 19.5V4.5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12 4.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-[var(--font-display)] text-sm font-extrabold tracking-tight text-foreground">
                Neeve
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#64748B]">
              The modern student library network for faster access, lower costs, and better reuse across campuses.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-foreground">Navigation</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/" className="text-[#334155] hover:text-foreground">Home</Link></li>
              <li><Link href="/marketplace" className="text-[#334155] hover:text-foreground">Marketplace</Link></li>
              <li><Link href="/colleges" className="text-[#334155] hover:text-foreground">Colleges</Link></li>
              <li><Link href="/about" className="text-[#334155] hover:text-foreground">About</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm font-semibold text-foreground">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a className="text-[#334155] hover:text-foreground" href="mailto:hello@phygitallibrary.com">hello@phygitallibrary.com</a></li>
              <li><a className="text-[#334155] hover:text-foreground" href="#">LinkedIn</a></li>
              <li><a className="text-[#334155] hover:text-foreground" href="#">Twitter</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm font-semibold text-foreground">Trust</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-[#334155] hover:text-foreground">Privacy</Link></li>
              <li><Link href="#" className="text-[#334155] hover:text-foreground">Terms</Link></li>
              <li><Link href="#" className="text-[#334155] hover:text-foreground">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-[#64748B]">© {new Date().getFullYear()} Neeve. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}