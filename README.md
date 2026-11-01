# Code Kailash — agency website

A single-page website for a small web design and development team working with
businesses across Uttarakhand.

Built with Next.js (App Router), strict TypeScript, Tailwind CSS, Framer Motion,
GSAP + ScrollTrigger and Lucide icons.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

Scripts:

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

## Replacing the placeholder identity

Everything user-facing that identifies the studio lives in one file:

- `src/lib/site.ts` — name, wordmark, email, phone, WhatsApp number, service
  areas and site URL.

Replace these before launch:

| Placeholder | Where |
| --- | --- |
| `Code Kailash` name | `siteConfig.name` / `siteConfig.wordmark` |
| `hello@yourdomain.com` | `siteConfig.email` |
| `+91 00000 00000` | `siteConfig.phoneDisplay`, `siteConfig.phoneHref` |
| `910000000000` | `siteConfig.whatsappNumber` (digits only, with country code) |
| `https://your-domain.com` | `NEXT_PUBLIC_SITE_URL` in `.env.local` and the fallback in `siteConfig.url` |

### Logo and favicon

- Original artwork: `public/logo.png`.
- Header/footer mark: `public/images/code-kailash-mark.png` (trimmed, transparent).
- Favicon: `src/app/icon.png`; Apple touch icon: `src/app/apple-icon.png`.
- PWA icons: `public/icon-192.png` and `public/icon-512.png`.

All derivatives are generated from `public/logo.png`. If the logo changes,
regenerate the trimmed transparent mark and the icon sizes from the new file,
then keep the file names the same so no components need editing.

The name itself comes from `siteConfig.name` / `siteConfig.wordmark`, so the
header, footer, menu and metadata all update together.

Search the codebase for `yourdomain` and `00000` after editing to confirm
nothing was missed.

## Content

All copy that is likely to change is kept out of components:

| File | Contents |
| --- | --- |
| `src/content/services.ts` | Four services and feature lists |
| `src/content/industries.ts` | Five target industries, imagery and tags |
| `src/content/projects.ts` | Concept projects (mark `kind: "client"` and add `liveUrl` for real work) |
| `src/content/process.ts` | Five-step process |
| `src/content/pricing.ts` | Build packages and monthly care plans |
| `src/content/team.ts` | Working principles and the four team roles |
| `src/content/faqs.ts` | FAQ questions and answers |

### Concept work

The three portfolio pieces are **self-initiated concept demonstrations**, not
client projects. They are labelled as such in the UI. Do not describe them as
client work, add invented testimonials, statistics or logos, or imply
partnerships.

When a real project is ready:

1. Add an entry to `src/content/projects.ts`.
2. Set `kind: "client"`, add the live URL to `liveUrl`, and use a real preview
   in `src/components/visuals/previews/`.
3. Update the "Selected work" supporting copy in
   `src/components/sections/SelectedWork.tsx` if the mix changes.

### Team

Only roles are shown. The site intentionally avoids invented names, photos,
qualifications or experience claims. Add real profiles to
`src/content/team.ts` when they exist.

## Enquiry form

The form validates on the client and again on the server, and does not show a
success state unless the API confirms delivery.

- Client component: `src/components/forms/EnquiryForm.tsx`
- Shared validation: `src/lib/enquiry.ts`
- API route: `src/app/api/enquiry/route.ts`

Delivery options (set one in `.env.local`, see `.env.example`):

1. **Webhook** — `ENQUIRY_WEBHOOK_URL` receives a JSON `POST`.
2. **Resend email** — set `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL` and a verified
   `ENQUIRY_FROM_EMAIL`.
3. **Local development fallback** — with nothing configured and
   `NODE_ENV !== "production"`, submissions are appended to
   `.enquiries/enquiries.jsonl` (git-ignored) so the flow can be tested.

In production with no delivery method configured, the API returns `503` and the
form tells the visitor to email or WhatsApp directly. There is no fake success
state.

The route also includes basic in-memory rate limiting (5 submissions per IP per
10 minutes) and a honeypot field.

## Design system

- Tokens and base styles: `src/app/globals.css` (`ink`, `paper`, `line`,
  `accent`, `rust`, `muted`).
- Fonts are self-hosted in `src/app/fonts`: Inter Variable for UI/text and
  Instrument Serif Italic for accents.
- Imagery lives in `public/images`. Photography is from Unsplash; replace with
  owned photography before launch if preferred.

Animation responsibilities are split deliberately:

- **Framer Motion** — navigation, menus, buttons, hover states, staggered
  entrances, FAQ accordions.
- **GSAP + ScrollTrigger** — hero parallax, industry image parallax, the pinned
  horizontal portfolio, and the process timeline line.

Both respect `prefers-reduced-motion`. GSAP work is wrapped in
`gsap.matchMedia()` so it never runs for reduced-motion users.

## SEO

- Metadata, Open Graph and Twitter cards in `src/app/layout.tsx`.
- Dynamic OG image at `src/app/opengraph-image.tsx`.
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`.
- JSON-LD `ProfessionalService`, `WebSite` and `FAQPage` in the root layout.
- Local keywords target Uttarakhand, including Bhimtal, Haldwani and Nainital.

No guaranteed-ranking or revenue claims are made anywhere on the site.

## Deployment

The site builds as a standard Next.js app. Set the environment variables from
`.env.example` in your host (Vercel, Netlify, or a Node server), then:

```bash
npm run build
npm run start
```

Before going live:

- [ ] Replace all placeholder contact details in `src/lib/site.ts`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- [ ] Configure one enquiry delivery option and send a test enquiry.
- [ ] Add real project case studies when available.
- [ ] Replace concept previews and stock photography where appropriate.
- [ ] Re-check the site on a real phone.
