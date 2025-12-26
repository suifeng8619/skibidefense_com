import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <span className="text-lg font-bold text-yellow-400">SkibiValues</span>
            <p className="text-sm text-muted-foreground">
              The most accurate Skibi Defense value list and trade calculator.
              Check unit prices and avoid scams.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Value List
              </Link>
              <Link
                href="/calculator"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Trade Calculator
              </Link>
              <Link
                href="/codes"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Redeem Codes
              </Link>
            </nav>
          </div>

          {/* Disclaimer */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              SkibiValues is a fan-made site and is not affiliated with Roblox
              Corporation or the creators of Skibi Defense.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-sm text-center text-muted-foreground">
            &copy; {currentYear} SkibiValues. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
