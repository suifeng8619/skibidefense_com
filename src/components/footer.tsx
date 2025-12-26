import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <span className="text-lg font-bold text-yellow-400">Skibi Defense Values</span>
            <p className="text-sm text-muted-foreground">
              The most accurate Skibi Defense value list and trade calculator.
              Check Skibi Defense unit prices and avoid scams in trading.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Skibi Defense Tools</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skibi Defense Value List
              </Link>
              <Link
                href="/calculator"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skibi Defense Trade Calculator
              </Link>
              <Link
                href="/codes"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skibi Defense Codes
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Skibi Defense Info</h3>
            <nav className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">
                Diamond Units
              </span>
              <span className="text-sm text-muted-foreground">
                Godly Units
              </span>
              <span className="text-sm text-muted-foreground">
                Trading Tips
              </span>
            </nav>
          </div>

          {/* Disclaimer */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              This is a fan-made Skibi Defense value list and is not affiliated
              with Roblox Corporation or Skibi Defense developers.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-xs sm:text-sm text-center text-muted-foreground">
            &copy; {currentYear} Skibi Defense Value List. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
