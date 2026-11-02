/**
 * Single source of truth for the studio's identity and contact details.
 *
 * Email is the only published contact channel. The logo mark lives in
 * `public/images/code-kailash-mark.png`; the favicon is generated from
 * `public/logo.png`.
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
  email: "code4kailash@gmail.com",
  locations: ["Bhimtal", "Haldwani", "Nainital"] as const,
  locationLine: "Uttarakhand",
  region: "Uttarakhand, India",
  serviceAreas: ["Uttarakhand", "Bhimtal", "Haldwani", "Nainital", "Across India"] as const,
  /** Lowest starting price shown on the site. */
  startingPrice: "₹7,999",
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

