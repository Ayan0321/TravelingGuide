# Traveling Guide

A sleek travel website built with Next.js App Router and Tailwind CSS. Features a transparent-feel hero with rotating posters, searchable states/places with alias support, services with a quote form, and a secure admin area to manage content. Uses JSON storage via LowDB for easy local setup and includes image upload/optimization.

## Tech
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS 4
- LowDB (JSON) for data storage (no external DB required)
- Zod for validation
- Sharp for image optimization (optional; falls back if not available)

## Quick Start
```bash
pnpm install
pnpm dev
```
Visit http://localhost:3000

## Seed Demo Data
Seed via API after the server starts:
```bash
curl -X POST http://localhost:3000/api/seed
```
This creates demo states, a couple of places, services, and posters, and sets defaults like poster rotation.

## Admin
- Login: http://localhost:3000/admin/login
- Default password: `admin123` (override via `ADMIN_PASSWORD` env var)
- Manage: states, places, posters, services, settings (logo, rotation)

## Environment
Create `.env.local` as needed:
```
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Image Uploads
- Uploaded images are stored under `public/uploads`
- Sharp resizes to max 1600px and compresses; if Sharp is unavailable, files are stored as-is

## Search
- Global search (header + /search) looks up by name, slug, and aliases
- Includes alias handling for misspellings like "Laddakh" → Ladakh, "Waynard" → Wayanad, "Panchmani" → Pachmarhi

## Forms
- Services "Get a Quote" form → POST /api/quote (validates and logs to server console)
- Contact form → POST /api/contact (validates and logs)

## Replacing the Logo
- Use Admin → Settings to upload a new logo; the header reads from settings
- Or manually set `Setting{ key: 'logoUrl', value: '{{LOGO_URL}}' }`

## Deploy
- Works on Node runtimes (Vercel/Render/Fly/Heroku). Ensure build scripts for native deps are allowed.
- If using static export, server APIs won’t run; keep Node runtime for Admin and APIs.

## Lighthouse & A11y Notes
- Semantic markup, alt text provided; keyboard-friendly focusable controls
- Use responsive images, lazy-loading, and small shadows
- Further improve by adding canonical tags and JSON-LD per route if needed

## Scripts
- `pnpm dev` - start dev server
- `pnpm build && pnpm start` - production build and start

## Folder Structure
- `app/` - routes and UI
- `app/admin/*` - admin UI (protected)
- `app/api/*` - API endpoints (CRUD + uploads + forms)
- `lib/*` - DB, types, auth, utilities
- `data/db.json` - JSON data file (created at runtime)
- `public/uploads` - uploaded images
