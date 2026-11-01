/**
 * Single source of truth for the studio's identity and contact details.
 *
 * Contact details are intentionally obvious placeholders. Replace them before
 * launch. The logo mark lives in `public/images/code-kailash-mark.png`; the
 * favicon is generated from `public/logo.png`.
 */
export const siteConfig = {
  name: "Code Kailash",
  wordmark: {
    primary: "Code",
    secondary: "Kailash",
  },
  description:
    "A small web design and development team helping businesses across Uttarakhand build thoughtful, dependable websites.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com",
  email: "hello@yourdomain.com",
  phoneDisplay: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  /** Digits only, including country code. Replace before launch. */
  whatsappNumber: "910000000000",
  locations: ["Bhimtal", "Haldwani", "Nainital"] as const,
  locationLine: "Uttarakhand",
  region: "Uttarakhand, India",
  serviceAreas: ["Uttarakhand", "Bhimtal", "Haldwani", "Nainital", "Across India"] as const,
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
  "Hello Code Kailash, I'd like to discuss a website for my business.";
