import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { faqs } from "@/content/faqs";
import { navItems, siteConfig } from "@/lib/site";

const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/InstrumentSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/InstrumentSerif-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const siteUrl = siteConfig.url.replace(/\/$/, "");
const pageTitle =
  "Web Design & Development in Bhimtal, Haldwani & Nainital | Kumaon Studio";
const pageDescription =
  "A small web design and development team helping local businesses in Bhimtal, Haldwani and Nainital build thoughtful websites that earn trust and enquiries.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: pageDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "web design Bhimtal",
    "website development Haldwani",
    "web designer Nainital",
    "website design Uttarakhand",
    "local business website",
    "cafe website design",
    "hotel website design",
    "website maintenance Kumaon",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: siteConfig.name,
    title: pageTitle,
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#business`,
      name: siteConfig.name,
      description: pageDescription,
      url: siteUrl,
      email: siteConfig.email,
      telephone: siteConfig.phoneDisplay,
      priceRange: "₹7,999–₹34,999",
      areaServed: siteConfig.locations.map((name) => ({
        "@type": "City",
        name,
      })),
      serviceType: [
        "Website design",
        "Website development",
        "Website redesign",
        "Website maintenance",
      ],
      knowsAbout: [
        "Responsive web design",
        "Local business websites",
        "Enquiry forms",
        "Google Maps integration",
        "WhatsApp integration",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website development packages",
        itemListElement: [
          "Starter Website",
          "Business Website",
          "Premium Website",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      description: pageDescription,
      inLanguage: "en-IN",
      publisher: { "@id": `${siteUrl}/#business` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-white text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          {children}
          <Footer />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
      </body>
    </html>
  );
}
