export const businessCategories = [
  "Cafe / Restaurant",
  "Hotel / Resort",
  "Gym / Fitness Studio",
  "Salon / Barber",
  "Coaching Institute",
  "Other local business",
] as const;

export const serviceOptions = [
  "New website",
  "Website redesign",
  "Bug fixing / improvements",
  "Website maintenance",
  "Not sure yet",
] as const;

export type BusinessCategory = (typeof businessCategories)[number];
export type ServiceOption = (typeof serviceOptions)[number];

export type EnquiryFields = {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  category: string;
  service: string;
  description: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryFields, string>>;

export type EnquiryData = {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  category: BusinessCategory;
  service: ServiceOption;
  description: string;
};

export const emptyEnquiry: EnquiryFields = {
  name: "",
  businessName: "",
  phone: "",
  email: "",
  category: "",
  service: "",
  description: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneCharacters = /^[+()\d\s-]+$/;

function isBusinessCategory(value: string): value is BusinessCategory {
  return (businessCategories as readonly string[]).includes(value);
}

function isServiceOption(value: string): value is ServiceOption {
  return (serviceOptions as readonly string[]).includes(value);
}

export function validateEnquiry(
  values: EnquiryFields,
): { ok: true; data: EnquiryData } | { ok: false; errors: EnquiryErrors } {
  const errors: EnquiryErrors = {};

  const name = values.name.trim();
  const businessName = values.businessName.trim();
  const phone = values.phone.trim();
  const email = values.email.trim();
  const category = values.category.trim();
  const service = values.service.trim();
  const description = values.description.trim();

  if (name.length < 2) {
    errors.name = "Please enter your name.";
  } else if (name.length > 80) {
    errors.name = "Please keep your name under 80 characters.";
  }

  if (businessName.length > 100) {
    errors.businessName = "Please keep the business name under 100 characters.";
  }

  const digitCount = phone.replace(/\D/g, "").length;
  if (!phone) {
    errors.phone = "Please enter a phone number.";
  } else if (!phoneCharacters.test(phone) || digitCount < 7 || digitCount > 15) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!email) {
    errors.email = "Please enter an email address.";
  } else if (!emailPattern.test(email) || email.length > 160) {
    errors.email = "Please enter a valid email address.";
  }

  if (!category) {
    errors.category = "Please choose a business category.";
  } else if (!isBusinessCategory(category)) {
    errors.category = "Please choose a listed business category.";
  }

  if (!service) {
    errors.service = "Please choose the service you need.";
  } else if (!isServiceOption(service)) {
    errors.service = "Please choose a listed service.";
  }

  if (description.length < 20) {
    errors.description =
      "A sentence or two helps us reply properly — at least 20 characters.";
  } else if (description.length > 2000) {
    errors.description = "Please keep the description under 2,000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  if (!isBusinessCategory(category) || !isServiceOption(service)) {
    return {
      ok: false,
      errors: { category: "Please choose a listed option.", service: "Please choose a listed option." },
    };
  }

  return {
    ok: true,
    data: {
      name,
      businessName,
      phone,
      email,
      category,
      service,
      description,
    },
  };
}
