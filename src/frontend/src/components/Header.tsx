import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const navLinks = [
  { to: "/diseases", label: "Diseases" },
  { to: "/drugs", label: "Drug Reference" },
  { to: "/management", label: "Animal Management" },
  { to: "/gallery", label: "Gallery" },
];

export default function Header() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success" && !!identity;
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-blue flex items-center justify-center shadow-sm">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                  fill="white"
                  opacity="0.9"
                />
                <path
                  d="M8 12c1-1.5 2-2 4-2s3 .5 4 2"
                  stroke="#0B5CCB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="10" r="1" fill="#0B5CCB" />
                <circle cx="14" cy="10" r="1" fill="#0B5CCB" />
                <path
                  d="M10 14.5c.5.5 1 .7 2 .7s1.5-.2 2-.7"
                  stroke="#0B5CCB"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-brand-blue text-lg tracking-tight">
                KENNATIL
              </span>
              <span className="font-heading font-medium text-brand-navy text-xs tracking-widest">
                DR · VET SERVICES
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  currentPath === link.to
                    ? "bg-brand-hero text-brand-blue"
                    : "text-muted-foreground hover:text-brand-blue hover:bg-brand-hero"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Button */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                className="hidden md:flex items-center gap-2 rounded-full border-brand-blue text-brand-blue hover:bg-brand-hero"
                data-ocid="auth.button"
              >
                <LogOut size={14} />
                Logout
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={loginStatus === "logging-in"}
                className="hidden md:flex items-center gap-2 rounded-full bg-brand-blue hover:bg-brand-footer text-white"
                data-ocid="auth.button"
              >
                <LogIn size={14} />
                {loginStatus === "logging-in" ? "Connecting..." : "Login"}
              </Button>
            )}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-brand-blue"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.toggle"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-brand-blue hover:bg-brand-hero"
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clear}
                  className="w-full rounded-full"
                  data-ocid="auth.button"
                >
                  <LogOut size={14} className="mr-2" /> Logout
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={login}
                  className="w-full rounded-full bg-brand-blue text-white"
                  data-ocid="auth.button"
                >
                  <LogIn size={14} className="mr-2" /> Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
