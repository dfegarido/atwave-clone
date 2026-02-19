import { Linkedin, Twitter } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
  {
    title: "Platform",
    links: ["Demand Generation", "Audience Intelligence", "Analytics", "Integrations"],
  },
  {
    title: "Resources",
    links: ["Blog", "Case Studies", "Whitepapers", "Documentation"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <a
              href="#"
              className="text-xl font-bold tracking-tight text-white"
            >
              Nexus
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
              Enterprise-grade demand generation and digital transformation
              platform.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="text-gray-500 transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="text-gray-500 transition-colors hover:text-white"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold tracking-wide text-gray-300">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 transition-colors duration-200 hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Nexus. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-gray-600 transition-colors hover:text-gray-400"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-gray-600 transition-colors hover:text-gray-400"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
