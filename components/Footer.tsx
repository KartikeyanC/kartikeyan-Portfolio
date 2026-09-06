"use client";

import { nav, site } from "@/data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-14">
      <div className="container-editorial">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 font-display text-sm font-semibold">
                {site.initials}
              </span>
              <span className="font-medium">{site.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {site.role} · {site.location}
            </p>
          </div>

          <div className="flex gap-14">
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">Navigate</h3>
              <ul className="mt-4 space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="link-underline text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">Elsewhere</h3>
              <ul className="mt-4 space-y-2.5">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
                    >
                      <span className="link-underline">{social.label}</span>
                      <span
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="link-underline transition-colors hover:text-ink-muted">Privacy</a>
            <a href="#" className="link-underline transition-colors hover:text-ink-muted">Imprint</a>
            <a href="#top" className="link-underline transition-colors hover:text-ink-muted">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
