import type { Service } from "@/lib/types";

export const services: readonly Service[] = [
  {
    id: "website-development",
    number: "01",
    title: "Website Development",
    summary:
      "A considered website built around your business — clear, fast and easy for customers to use.",
    features: [
      "Custom website design and development",
      "Responsive layouts",
      "Business information and service pages",
      "Contact and enquiry forms",
      "WhatsApp integration",
      "Google Maps integration",
    ],
    visual: "build",
  },
  {
    id: "website-redesign",
    number: "02",
    title: "Website Redesign",
    summary:
      "Keep what works. Rebuild what doesn’t. A calmer, clearer site that feels current and performs better.",
    features: [
      "Modernise outdated websites",
      "Improve mobile responsiveness",
      "Better user experience",
      "Improved visual presentation",
      "Performance improvements",
    ],
    visual: "redesign",
  },
  {
    id: "bug-fixing",
    number: "03",
    title: "Bug Fixing & Improvements",
    summary:
      "Practical fixes for the small things that get in the way of customers using your website.",
    features: [
      "Frontend and backend bug fixing",
      "Website performance issues",
      "Form and integration fixes",
      "Layout and responsiveness issues",
    ],
    visual: "fix",
  },
  {
    id: "maintenance",
    number: "04",
    title: "Website Maintenance",
    summary:
      "Ongoing care so your site stays accurate, secure and dependable long after launch day.",
    features: [
      "Regular website updates",
      "Technical checks",
      "Backups",
      "Minor bug fixes",
      "Performance monitoring",
      "Ongoing support",
    ],
    visual: "care",
  },
];
