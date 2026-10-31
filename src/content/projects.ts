import type { Project } from "@/lib/types";

/**
 * Concept demonstrations created in-house. These are not client projects.
 * When a concept is published, add its URL to `liveUrl`; the project card will
 * automatically expose a live preview link.
 */
export const projects: readonly Project[] = [
  {
    slug: "aamod",
    name: "Aamod",
    industry: "Cafe & Restaurant",
    kind: "concept",
    summary:
      "A warm, editorial concept for a neighbourhood cafe — seasonal menu, kitchen story, visit details and table enquiries.",
    focus: ["Menu system", "Food story", "Table enquiries"],
    preview: "cafe",
  },
  {
    slug: "sitara",
    name: "Sitara",
    industry: "Hotel & Resort",
    kind: "concept",
    summary:
      "A quiet, image-led concept for a hillside retreat, built around rooms, amenities and direct guest enquiries.",
    focus: ["Room gallery", "Experiences", "Enquiry flow"],
    preview: "hotel",
  },
  {
    slug: "forge",
    name: "Forge",
    industry: "Gym & Fitness",
    kind: "concept",
    summary:
      "A high-contrast concept for a strength studio, with membership plans, coaches and a clear first-visit path.",
    focus: ["Membership plans", "Coaches", "Timetable"],
    preview: "gym",
  },
];
