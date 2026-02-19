"use client";

import FadeIn from "./FadeIn";
import {
  siStripe,
  siGithub,
  siNotion,
  siFigma,
  siDatabricks,
  siSnowflake,
  siAtlassian,
  siShopify,
  siZoom,
  siHubspot,
  siMongodb,
  siLinear,
  siVercel,
  siZendesk,
  siIntercom,
  siOkta,
  siDatadog,
  siGooglecloud,
} from "simple-icons";

interface BrandLogo {
  icon: { path: string; title: string };
  label: string;
}

const brands: BrandLogo[] = [
  { icon: siStripe,      label: "Stripe" },
  { icon: siGithub,      label: "GitHub" },
  { icon: siDatabricks,  label: "Databricks" },
  { icon: siSnowflake,   label: "Snowflake" },
  { icon: siAtlassian,   label: "Atlassian" },
  { icon: siHubspot,     label: "HubSpot" },
  { icon: siShopify,     label: "Shopify" },
  { icon: siZoom,        label: "Zoom" },
  { icon: siNotion,      label: "Notion" },
  { icon: siFigma,       label: "Figma" },
  { icon: siMongodb,     label: "MongoDB" },
  { icon: siLinear,      label: "Linear" },
  { icon: siVercel,      label: "Vercel" },
  { icon: siZendesk,     label: "Zendesk" },
  { icon: siIntercom,    label: "Intercom" },
  { icon: siOkta,        label: "Okta" },
  { icon: siDatadog,     label: "Datadog" },
  { icon: siGooglecloud, label: "Google Cloud" },
];

function BrandItem({ brand }: { brand: BrandLogo }) {
  return (
    <div className="group inline-flex select-none items-center gap-5 px-8 py-2 min-w-fit shrink-0 cursor-default">
      {/* SVG icon — larger, scales up on hover */}
      <svg
        role="img"
        viewBox="0 0 24 24"
        aria-label={brand.label}
        className="h-10 w-10 shrink-0 fill-white/30 transition-all duration-400 ease-out group-hover:fill-white/90 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
      >
        <path d={brand.icon.path} />
      </svg>
      {/* Label */}
      <span className="text-lg font-semibold tracking-tight text-white/30 transition-all duration-400 ease-out group-hover:text-white/90 whitespace-nowrap group-hover:tracking-normal">
        {brand.label}
      </span>
    </div>
  );
}

export default function LogoStrip() {
  return (
    <section className="border-b border-white/10 bg-navy-deep py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <p className="mb-10 text-center text-sm font-medium tracking-widest text-gray-500 uppercase">
            Trusted by industry leaders
          </p>
        </FadeIn>
      </div>

      {/* Marquee container — full bleed, overflow hidden */}
      <div className="relative overflow-hidden">
        {/* Left/right fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40 bg-gradient-to-r from-navy-deep to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40 bg-gradient-to-l from-navy-deep to-transparent" />

        {/* Marquee track — duplicated for seamless loop */}
        <div className="animate-marquee flex items-center gap-0 whitespace-nowrap px-10">
          {[...brands, ...brands].map((brand, i) => (
            <div key={`${brand.label}-${i}`} className="flex items-center">
              <BrandItem brand={brand} />
              <span className="h-8 w-px bg-white/10 shrink-0" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
