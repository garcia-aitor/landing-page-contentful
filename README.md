# AI Feed Optimizer landing

Nuxt 4 + Contentful campaign landing, rendered on the server.

## Run

```bash
cp .env.example .env
```

Fill in:

- `NUXT_CONTENTFUL_SPACE_ID`
- `NUXT_CONTENTFUL_ENVIRONMENT` (`master` by default)
- `NUXT_CONTENTFUL_ACCESS_TOKEN` (Content Delivery API token)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing index, or `/ai-feed-optimizer` for the campaign page.

```bash
npm run build
npm run preview
```

Do not commit `.env`.

## Architecture

The page never talks to Contentful. Data flows:

`useFetch` → Nitro API (`server/api`) → Contentful client (`server/utils/contentful.ts`) → mapper (`mapLandingPage`) → Vue section components.

`/` lists published landings (slug + title only). `/{slug}` loads one page with `include: 3` and renders `pageSections` in CMS order: `hero` → `SectionHero`, `sectionBenefits` → `SectionBenefits`, `ctaSection` → `SectionCta`. Unknown or incomplete entries are skipped.

## Contentful model


| Type              | Role                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `landingPage`     | Page shell: `slug`, SEO (`metaTitle`, `metaDescription`), `pageSections` (ordered references) |
| `hero`            | Headline, supporting copy, primary CTA                                                        |
| `sectionBenefits` | Optional heading/subheading, `benefits` (ordered references)                                  |
| `benefit`         | Title + description                                                                           |
| `ctaSection`      | Closing headline, optional copy, CTA                                                          |
| `cta`             | `buttonLabel`, optional `url`, optional `hubspotFormId`, `openInNewTab`                       |


Marketing can add, remove, or reorder benefits and sections in Contentful. No code change.

CTA rules:

- URL → link
- no URL, but `hubspotFormId` → button that opens a placeholder modal
- neither → CTA is omitted

Missing or unpublished references are skipped in the mapper. The page does not crash.

## SSR

Contentful credentials live in **private** `runtimeConfig`. They must never reach the browser.

The first version fetched Contentful from the page (`useAsyncData` + a server util). Two problems:

1. Vite pulled the Contentful SDK into the **client** bundle (~143 KB).
2. `useAsyncData` only runs on the server on first load. Client-side navigation would call Contentful in the browser, where the token does not exist.

The fix is a Nitro route:

- `GET /api/landing-pages` — index (slug + title only, no `include`)
- `GET /api/landing-pages/:slug` — full page (`include: 3`)

The Vue page uses `useFetch`. On SSR, Nuxt calls the handler in-process (no extra HTTP hop). On client navigation, it hits the API. The SDK stays on the server.

`ssr: true` is set explicitly in `nuxt.config.ts`. Title and description come from Contentful via `useSeoMeta`.