export type ServiceVisual = "build" | "redesign" | "fix" | "care";

export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  features: readonly string[];
  visual: ServiceVisual;
};

export type Industry = {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: readonly string[];
  image: string;
  imageAlt: string;
  accent: string;
  aspect: "portrait" | "landscape" | "square" | "tall";
};

export type PreviewVariant = "cafe" | "hotel" | "gym";

export type Project = {
  slug: string;
  name: string;
  industry: string;
  kind: "concept" | "client";
  summary: string;
  focus: readonly string[];
  preview: PreviewVariant;
  liveUrl?: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  outcome: string;
};

export type BuildPackage = {
  id: string;
  name: string;
  description: string;
  features: readonly string[];
  recommended?: boolean;
};

export type CarePlan = {
  name: string;
  summary: string;
  features: readonly string[];
};

export type TeamRole = {
  number: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Principle = {
  number: string;
  title: string;
  description: string;
};
