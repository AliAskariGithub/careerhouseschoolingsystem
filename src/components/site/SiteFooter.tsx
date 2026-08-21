import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";

import { school } from "@/data/school";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="font-display text-lg font-bold">{school.name}</h2>
          <p className="mt-3 text-sm text-navy-foreground/75">
            A co-educational school in Landhi Town, Karachi, offering pre-school through
            Matriculation under the {school.board}.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-foreground/70">
            Quick links
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/about", label: "About the school" },
              { to: "/academics", label: "Classes & courses" },
              { to: "/admissions", label: "Admissions process" },
              { to: "/fees", label: "Fee structure" },
              { to: "/news", label: "News & events" },
              { to: "/contact", label: "Contact us" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-navy-foreground/80 transition-colors hover:text-brand-foreground hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-foreground/70">
            Visit us
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{school.address}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>Monday to Saturday, 8:00 AM – 3:00 PM</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{school.phonePlaceholder}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-foreground/15 py-5 text-center text-xs text-navy-foreground/60">
        © {new Date().getFullYear()} {school.name}, Landhi Town, Karachi. All rights reserved.
      </div>
    </footer>
  );
}
