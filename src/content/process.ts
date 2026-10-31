import type { ProcessStep } from "@/lib/types";

export const processSteps: readonly ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start with a conversation about your business, your customers and what the website needs to achieve. No jargon, just questions.",
    outcome: "A clear brief, scope and priority list",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We plan the pages and create a thoughtful visual direction tailored to your business — not a recoloured template.",
    outcome: "A page plan and design direction to review",
  },
  {
    number: "03",
    title: "Development",
    description:
      "The approved design is built into a responsive, reliable website. Forms, maps and the details that matter are tested as we go.",
    outcome: "A responsive, working preview",
  },
  {
    number: "04",
    title: "Review & Refinement",
    description:
      "You review the preview on your own devices. We collect feedback, make the agreed revisions and check everything once more.",
    outcome: "A refined site, ready for launch",
  },
  {
    number: "05",
    title: "Launch & Support",
    description:
      "We deploy the site, connect your domain and walk you through what you need to know. Ongoing care is available if you want it.",
    outcome: "A live site, handover and optional care",
  },
];
