import type { BuildPackage, CarePlan } from "@/lib/types";

export const buildPackages: readonly BuildPackage[] = [
  {
    id: "starter",
    name: "Starter Website",
    price: "₹7,999 – ₹9,999",
    description:
      "A focused one-page presence for a new or small business that needs to look credible online.",
    features: [
      "One-page responsive website",
      "Business information",
      "Services section",
      "Contact / WhatsApp button",
      "Google Maps integration",
      "Basic on-page setup",
    ],
  },
  {
    id: "business",
    name: "Business Website",
    price: "₹12,999 – ₹17,999",
    description:
      "The right fit for most local businesses that need room to explain what they do and why it matters.",
    features: [
      "Approximately 4–5 pages",
      "Home, About, Services/Menu, Gallery and Contact",
      "Enquiry form",
      "WhatsApp integration",
      "Google Maps",
      "Basic SEO setup",
    ],
    recommended: true,
  },
  {
    id: "premium",
    name: "Premium Website",
    price: "₹22,999 – ₹34,999",
    description:
      "A more custom experience for businesses with broader content, selected integrations or bigger ambitions.",
    features: [
      "Approximately 6–10 pages",
      "Custom UI/UX",
      "Premium animations",
      "Advanced enquiry forms",
      "Selected integrations",
      "Basic analytics",
      "SEO setup",
    ],
  },
];

export const carePlans: readonly CarePlan[] = [
  {
    name: "Basic Care",
    price: "₹799",
    summary: "A light safety net for a simple, stable website.",
    features: [
      "Uptime checks",
      "Basic technical checks",
      "Minor bug fixes",
      "One small content update per month",
    ],
  },
  {
    name: "Business Care",
    price: "₹1,499",
    summary: "Regular care for a site that changes with your business.",
    features: [
      "Everything in Basic Care",
      "Up to three content updates",
      "Image and menu updates",
      "Form testing",
      "Monthly backup",
      "Basic security checks",
    ],
  },
  {
    name: "Premium Care",
    price: "₹2,999",
    summary: "Priority attention for a busier, more active website.",
    features: [
      "Everything in Business Care",
      "Up to six content updates",
      "Performance checks",
      "Priority support",
      "More frequent backups",
    ],
  },
];
