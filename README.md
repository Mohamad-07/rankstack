# RankStack

RankStack is an AI-powered developer utility platform for network diagnostics, asset optimization, hosting research, and technical SEO. The site combines free browser tools with practical guides and comparison content for developers, site owners, and SEO teams.

## Features

- DNS propagation checker with global resolver coverage
- IP checker and IP lookup tools
- AI image compressor with JPG, PNG, and WebP support
- AI hosting recommender quiz
- Hosting reviews, comparisons, and deal pages
- Technical SEO and programmable SEO content
- English-only editorial content
- Structured data, dynamic sitemap, and metadata-driven SEO

## Tech Stack

- Next.js 14 App Router
- React 18
- JavaScript and JSX
- Tailwind CSS 3
- Framer Motion
- Lucide and Heroicons
- TinyPNG API for image compression
- Server-side IP intelligence API

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

Set the required values:

```env
TINYPNG_API_KEY=your_tinypng_api_key
IPINFO_TOKEN=your_ipinfo_token
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `TINYPNG_API_KEY` | Yes | Server-side TinyPNG image compression |
| `IPINFO_TOKEN` | Yes | Server-side IP intelligence lookups |

Keys are read only on the server. Do not expose them with a `NEXT_PUBLIC_` prefix.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run Next.js ESLint checks |

## Project Structure

```text
app/                 App Router pages, metadata routes, and API handlers
components/          Shared UI, layout, schema, and tool components
content/             English blog content
Data/                Legacy content data used by shared components
constant/            Shared cards and static UI data
hooks/               Client-side data hooks
lib/                 Shared SEO and site configuration helpers
public/              Static assets, favicon set, and manifests
```

## API Routes

- `POST /api/image-compressor` - compress an uploaded image through TinyPNG
- `GET /api/ip` - resolve IP details through a server-side IP intelligence token
- `GET /api/dns-propagation` - resolve DNS records through Node DNS or DoH fallback

## SEO

- Global metadata is defined in `app/layout.js`
- Page metadata is generated with `lib/seo.js`
- Organization and SoftwareApplication JSON-LD live in `components/SchemaMarkup.js`
- The sitemap is generated dynamically in `app/sitemap.js`
- Crawl rules are defined in `app/robots.js`

## Deployment

The project is configured for Vercel. Add `TINYPNG_API_KEY` and `IPINFO_TOKEN` to the project environment variables before deploying. The canonical production domain is `https://rankstack.dev`.
# rankstack
