import { Link } from "@tanstack/react-router";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-brand-footer text-white">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
                    fill="white"
                    opacity="0.8"
                  />
                </svg>
              </div>
              <span className="font-heading font-bold text-white text-lg">
                KENNATIL DR
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted veterinary reference platform for disease management,
              drug information, and animal care guidance.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/diseases", label: "Disease Encyclopedia" },
                { to: "/drugs", label: "Drug Reference" },
                { to: "/management", label: "Animal Management" },
                { to: "/gallery", label: "Media Gallery" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-3">
              Contact
            </h4>
            <p className="text-white/70 text-sm">Dr. Kennatil</p>
            <p className="text-white/70 text-sm">
              Naitiri Area, Bungoma County
            </p>
            <p className="text-white/70 text-sm">Kenya</p>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?${utm}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
