import type { Principle, TeamRole } from "@/lib/types";

export const principles: readonly Principle[] = [
  {
    number: "01",
    title: "Thoughtful design",
    description: "Every layout starts with your customer, not a template.",
  },
  {
    number: "02",
    title: "Reliable development",
    description: "Clean, stable builds that work on the devices people actually use.",
  },
  {
    number: "03",
    title: "Responsive experiences",
    description: "Designed for the phone first, then refined for every screen.",
  },
  {
    number: "04",
    title: "Long-term support",
    description: "We stay available after launch for updates, fixes and honest advice.",
  },
];

export const teamRoles: readonly TeamRole[] = [
  {
    number: "01",
    title: "Sales & Client Acquisition",
    description:
      "Listens first, shapes the brief and keeps communication clear from enquiry to proposal.",
  },
  {
    number: "02",
    title: "Frontend Developer",
    description:
      "Turns the design direction into a fast, considered and genuinely responsive interface.",
  },
  {
    number: "03",
    title: "Full-Stack Developer",
    description:
      "Builds the forms, integrations and behind-the-scenes logic that make the site useful.",
  },
  {
    number: "04",
    title: "Deployment & Maintenance Developer",
    description:
      "Launches carefully, checks the details and keeps things running after the site goes live.",
  },
];
