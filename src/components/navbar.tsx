"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X, Calculator, Home, Gift } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-yellow-400">SkibiValues</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/calculator"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Calculator className="h-4 w-4" />
              Calculator
            </Link>
            <Link
              href="/codes"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Gift className="h-4 w-4" />
              Codes
            </Link>
          </div>

          {/* Search & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center">
              {isSearchExpanded ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Search units..."
                    className="w-48 h-9"
                    autoFocus
                    onBlur={() => setIsSearchExpanded(false)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchExpanded(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchExpanded(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Input
              type="search"
              placeholder="Search units..."
              className="w-full"
            />
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/calculator"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calculator className="h-4 w-4" />
                Calculator
              </Link>
              <Link
                href="/codes"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Gift className="h-4 w-4" />
                Codes
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
