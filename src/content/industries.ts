import type { Industry } from "@/lib/types";

export const industries: readonly Industry[] = [
  {
    id: "cafes-restaurants",
    number: "01",
    title: "Cafes & Restaurants",
    description:
      "Menus, food galleries, timings, location and table enquiries — presented the way your space feels.",
    tags: ["Menus", "Food galleries", "Timings", "Directions", "Enquiries", "Table enquiries"],
    image: "/images/cafe-interior.webp",
    imageAlt: "Warm, plant-filled cafe interior with wooden tables and pendant lights",
    accent: "#a95034",
    aspect: "landscape",
  },
  {
    id: "hotels-resorts",
    number: "02",
    title: "Hotels & Resorts",
    description:
      "Room galleries, amenities and enquiry paths that help guests picture their stay before they arrive.",
    tags: ["Room galleries", "Amenities", "Location", "Enquiries", "Booking integrations"],
    image: "/images/forest-retreat.webp",
    imageAlt: "Secluded wooden forest cabin surrounded by tall pine trees",
    accent: "#3e4a3b",
    aspect: "tall",
  },
  {
    id: "gyms-fitness",
    number: "03",
    title: "Gyms & Fitness Studios",
    description:
      "Membership plans, trainer profiles and facilities, built to turn local interest into a first visit.",
    tags: ["Membership plans", "Trainers", "Facilities", "Timings", "Enquiries"],
    image: "/images/gym-studio.webp",
    imageAlt: "Black and white view of a spacious gym with treadmills and weights",
    accent: "#59633f",
    aspect: "portrait",
  },
  {
    id: "salons-barbers",
    number: "04",
    title: "Salons & Barbers",
    description:
      "Services, pricing, portfolios and offers, with a simple way for clients to request an appointment.",
    tags: ["Services", "Pricing", "Portfolio", "Offers", "Appointment enquiries"],
    image: "/images/barber-shop.webp",
    imageAlt: "Warmly lit barber shop with leather chairs and exposed brick walls",
    accent: "#8c5b3f",
    aspect: "square",
  },
  {
    id: "coaching-institutes",
    number: "05",
    title: "Coaching Institutes",
    description:
      "Courses, faculty and batch details, with clear enquiry forms for students and parents.",
    tags: ["Courses", "Faculty", "Batch details", "Enquiries"],
    image: "/images/study-desk.webp",
    imageAlt: "Open notebook, pen and coffee on a quiet study desk",
    accent: "#46505c",
    aspect: "portrait",
  },
];
