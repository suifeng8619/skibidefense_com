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
            <h3 className="text-sm font-semibold text-foreground">Tools</h3>
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
                Active Codes
              </Link>
              <Link
                href="/search"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Search Units
              </Link>
            </nav>
          </div>

          {/* Rarities */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Rarities</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/rarity"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                All Rarities
              </Link>
              <Link
                href="/rarity/diamond"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Diamond Units
              </Link>
              <Link
                href="/rarity/godly"
                className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Godly Units
              </Link>
              <Link
                href="/rarity/cosmic"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Cosmic Units
              </Link>
              <Link
                href="/rarity/exclusives"
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Exclusive Units
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/trading-guide"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Trading Guide
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/game/skibi-defense"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skibi Defense
              </Link>
              <Link
                href="/game/toilet-tower-defense"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Toilet Tower Defense
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              &copy; {currentYear} Skibi Defense Value List. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground text-center sm:text-right max-w-md">
              Fan-made resource. Not affiliated with Roblox Corporation or Skibi Defense developers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
