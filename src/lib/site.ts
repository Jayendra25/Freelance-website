/**
 * Single source of truth for the studio's identity and contact details.
 *
 * These are intentionally obvious placeholders. Replace them before launch.
 * The wordmark is typographic so the identity can be swapped without new art.
 */
export const siteConfig = {
  name: "Kumaon Studio",
  wordmark: {
    primary: "kumaon",
    secondary: "studio",
  },
  description:
    "A small web design and development team helping local businesses in Bhimtal, Haldwani and Nainital build thoughtful, dependable websites.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com",
  email: "hello@yourdomain.com",
  phoneDisplay: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  /** Digits only, including country code. Replace before launch. */
  whatsappNumber: "910000000000",
  locations: ["Bhimtal", "Haldwani", "Nainital"] as const,
  locationLine: "Bhimtal · Haldwani · Nainital",
  region: "Kumaon, Uttarakhand",
  serviceAreas: ["Bhimtal", "Haldwani", "Nainital", "Kumaon region", "Across India"] as const,
} as const;

export type NavItem = {
  label: string;
  href: string;
  sectionId: string;
};

export const navItems: readonly NavItem[] = [
  { label: "Home", href: "#home", sectionId: "home" },
  { label: "Services", href: "#services", sectionId: "services" },
  { label: "Our Work", href: "#work", sectionId: "work" },
  { label: "Pricing", href: "#pricing", sectionId: "pricing" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export function whatsappHref(message: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsAppMessage =
  "Hello Kumaon Studio, I'd like to discuss a website for my business.";
