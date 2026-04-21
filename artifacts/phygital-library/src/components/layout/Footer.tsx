import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-50 relative overflow-hidden pt-32 pb-12 border-t border-border/10">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      
      {/* Corner glows */}
      <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          <div className="md:col-span-4 lg:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-6 group inline-flex">
              <div className="relative w-8 h-8 flex items-center justify-center text-amber-500">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                  <path d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H10.5C11.3284 3 12 3.67157 12 4.5V19.5C12 20.3284 11.3284 21 10.5 21H5.5C4.67157 21 4 20.3284 4 19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinelinejoin="round"/>
                  <path d="M12 4.5C12 3.67157 12.6716 3 13.5 3H18.5C19.3284 3 20 3.67157 20 4.5V19.5C20 20.3284 19.3284 21 18.5 21H13.5C12.6716 21 12 20.3284 12 19.5V4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinelinejoin="round"/>
                  <path d="M12 4.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinelinejoin="round"/>
                </svg>
              </div>
              <span className="font-serif font-medium text-2xl tracking-tight">
                PSLN
              </span>
            </Link>
            <p className="display-title text-2xl lg:text-3xl text-slate-300 max-w-sm mb-8">
              The modern library network for the next generation of students.
            </p>
          </div>
          
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-serif italic text-slate-400 mb-6 text-lg">Platform</h4>
              <ul className="space-y-4">
                <li><Link href="/student" className="text-slate-300 hover:text-amber-400 transition-colors">For Students</Link></li>
                <li><Link href="/colleges" className="text-slate-300 hover:text-amber-400 transition-colors">For Colleges</Link></li>
                <li><Link href="/marketplace" className="text-slate-300 hover:text-amber-400 transition-colors">Marketplace</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif italic text-slate-400 mb-6 text-lg">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-slate-300 hover:text-amber-400 transition-colors">About Us</Link></li>
                <li><a href="#" className="text-slate-300 hover:text-amber-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-slate-300 hover:text-amber-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-serif italic text-slate-400 mb-6 text-lg">Connect</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-300 hover:text-amber-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="text-slate-300 hover:text-amber-400 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-slate-300 hover:text-amber-400 transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Phygital Student Library Network. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
