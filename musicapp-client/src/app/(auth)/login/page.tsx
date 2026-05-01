import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen w-full flex overflow-hidden selection:bg-primary/30 selection:text-primary relative">
      {/* Immersive Background Stage */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* The Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full md:w-3/4 md:right-0 md:left-auto opacity-60 md:opacity-100 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFMF1dmkMeL7PRMkzbzYj7gxdAa0kyr0s4LQmUC1tPefTxe0hwhgDnln0wteogzVHhIPsHauTcVRIdbV0wkDoy9W6D3fkvV6NcGdum2UKf71CX7kcGXa8wZ-CjjkgAuaVQ8iQ6LeCR7BSI7fIFrDUFO1adgU_NDxpXTc-4RzfluPUrcaXyWFyZ5leR_cRTMg64KRVPjxFZUtAt_WdSATLRVODQ6sPk6Iw6iL3xKEY1QOdam7qUC8IWthzAA_ND7_a5BPnBL2dDNFVY')]" 
        >
        </div>
        {/* Tonal Transition Gradient (The Fade) */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background via-background/95 to-transparent w-full md:w-2/3 h-full z-10"></div>
      </div>
      {/* Content Canvas */}
      <div className="relative z-20 flex flex-col justify-center w-full min-h-screen px-8 md:px-16 lg:px-24 max-w-[600px]">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-[1.1] mb-4">
            The Sonic<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Immersive</span>
          </h1>
          <p className="text-on-surface-variant text-lg">Enter the void. Experience sound.</p>
        </header>
        {/* Login Form */}
        <form className="flex flex-col gap-8 w-full max-w-sm">
          {/* Inputs Group */}
          <div className="flex flex-col gap-6">
            {/* Email Input */}
            <div className="relative flex flex-col group">
              <label className="text-sm font-medium text-on-surface-variant mb-2 transition-colors group-focus-within:text-primary" htmlFor="email">Email Address</label>
              <div className="relative">
                <input className="w-full bg-transparent border-b border-outline-variant/30 text-on-surface py-2 focus:border-b-2 focus:border-primary focus:outline-none focus:ring-0 transition-all placeholder:text-surface-variant" id="email" name="email" placeholder="hello@example.com" required type="email"/>
              </div>
            </div>
            {/* Password Input */}
            <div className="relative flex flex-col group">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-on-surface-variant transition-colors group-focus-within:text-primary" htmlFor="password">Password</label>
                <Link className="text-xs text-primary hover:text-primary-dim transition-colors tracking-wide" href="#">Forgot?</Link>
              </div>
              <div className="relative">
                <input className="w-full bg-transparent border-b border-outline-variant/30 text-on-surface py-2 focus:border-b-2 focus:border-primary focus:outline-none focus:ring-0 transition-all placeholder:text-surface-variant pr-10" id="password" name="password" placeholder="••••••••" required type="password"/>
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors" type="button">
                  <span className="material-symbols-outlined text-xl">visibility_off</span>
                </button>
              </div>
            </div>
          </div>
          {/* Primary Action */}
          <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-lg rounded-full py-4 mt-4 shadow-[0_0_20px_rgba(79,254,126,0.15)] hover:shadow-[0_0_40px_rgba(79,254,126,0.3)] hover:scale-[1.02] transition-all duration-300 ease-out" type="submit">
            Log In
          </button>
          {/* Divider */}
          <div className="flex items-center gap-4 my-2 opacity-60">
            <div className="h-px bg-outline-variant/30 flex-1"></div>
            <span className="text-xs tracking-widest text-on-surface-variant uppercase font-medium">Or</span>
            <div className="h-px bg-outline-variant/30 flex-1"></div>
          </div>
          {/* Social Logins */}
          <div className="flex gap-4">
            {/* Google */}
            <button aria-label="Log in with Google" title="Log in with Google" className="flex-1 py-3.5 flex justify-center items-center rounded-full border border-outline-variant/15 hover:bg-surface-container-high hover:border-outline-variant/40 transition-all duration-200" type="button">
              <svg className="w-5 h-5 text-on-surface" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
              </svg>
            </button>
            {/* Facebook */}
            <button aria-label="Log in with Facebook" title="Log in with Facebook" className="flex-1 py-3.5 flex justify-center items-center rounded-full border border-outline-variant/15 hover:bg-surface-container-high hover:border-outline-variant/40 transition-all duration-200" type="button">
              <svg className="w-5 h-5 text-on-surface" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"></path>
              </svg>
            </button>
            {/* Apple */}
            <button aria-label="Log in with Apple" title="Log in with Apple" className="flex-1 py-3.5 flex justify-center items-center rounded-full border border-outline-variant/15 hover:bg-surface-container-high hover:border-outline-variant/40 transition-all duration-200" type="button">
              <svg className="w-5 h-5 text-on-surface" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702z"></path>
              </svg>
            </button>
          </div>
          {/* Footer Action */}
          <p className="text-center text-on-surface-variant text-sm mt-4">
            Don't have an account?{" "}
            <Link className="text-primary font-medium hover:text-primary-dim transition-colors" href="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
