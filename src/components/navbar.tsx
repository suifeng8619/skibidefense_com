"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X, Calculator, Home, Gift, Star, BookOpen, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
      setIsSearchExpanded(false);
    }
  };

  const navLinkClass = (path: string) =>
    `flex items-center gap-2 text-sm transition-colors ${
      isActive(path)
        ? "text-yellow-400 font-medium"
        : "text-muted-foreground hover:text-foreground"
    }`;

  const mobileNavLinkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
      isActive(path)
        ? "text-yellow-400 bg-yellow-400/10 font-medium"
        : "text-muted-foreground hover:text-foreground hover:bg-accent"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-bold text-yellow-400">Skibi Defense Values</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/" className={navLinkClass("/")}>
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link href="/rarity" className={navLinkClass("/rarity")}>
              <Star className="h-4 w-4" />
              Rarities
            </Link>
            <Link href="/calculator" className={navLinkClass("/calculator")}>
              <Calculator className="h-4 w-4" />
              Calculator
            </Link>
            <Link href="/codes" className={navLinkClass("/codes")}>
              <Gift className="h-4 w-4" />
              Codes
            </Link>
            <Link href="/trading-guide" className={navLinkClass("/trading-guide")}>
              <BookOpen className="h-4 w-4" />
              Guide
            </Link>
          </div>

          {/* Search & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center">
              {isSearchExpanded ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Search units..."
                    className="w-48 h-9"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => {
                      if (!searchQuery) setIsSearchExpanded(false);
                    }}
                    aria-label="Search units"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setIsSearchExpanded(false);
                      setSearchQuery("");
                    }}
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchExpanded(true)}
                  aria-label="Open search"
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 space-y-3">
            <form onSubmit={handleSearch}>
              <Input
                type="search"
                placeholder="Search units..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search units"
              />
            </form>
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className={mobileNavLinkClass("/")}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/rarity"
                className={mobileNavLinkClass("/rarity")}
                onClick={() => setIsMenuOpen(false)}
              >
                <Star className="h-4 w-4" />
                Rarities
              </Link>
              <Link
                href="/calculator"
                className={mobileNavLinkClass("/calculator")}
                onClick={() => setIsMenuOpen(false)}
              >
                <Calculator className="h-4 w-4" />
                Calculator
              </Link>
              <Link
                href="/codes"
                className={mobileNavLinkClass("/codes")}
                onClick={() => setIsMenuOpen(false)}
              >
                <Gift className="h-4 w-4" />
                Codes
              </Link>
              <Link
                href="/trading-guide"
                className={mobileNavLinkClass("/trading-guide")}
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4" />
                Trading Guide
              </Link>
              <Link
                href="/about"
                className={mobileNavLinkClass("/about")}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
