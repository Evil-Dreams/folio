# Vibishan Anandhan — Portfolio

A static-first React, TypeScript, and Vite portfolio. Case studies and profile content are maintained in `src/content.ts`; the shared case-study template makes every project directly shareable. Original generated visual sources live under `src/assets/generated`; the build and dev commands convert them to compressed WebP before serving. The contact page uses a `mailto:` action and does not claim to submit or store messages.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Vite prints the local URL. For a production build and local preview:

```sh
npm run build
npm run preview
```

Run the content checks with `npm test`; run TypeScript validation with `npm run typecheck`; run ESLint with `npm run lint`.

## Deploy to Render

The included `render.yaml` configures a Render Static Site. In Render, choose **New → Blueprint**, connect this repository, and create the service from the blueprint. The build command is `npm ci && npm run build`, and the publish directory is `dist`. A rewrite sends direct project URLs such as `/work/sentio-kairo` to the client router, so refreshing a case study continues to work.

Set `VITE_SITE_URL` in the Render service environment to the final public origin (for example, the Render `onrender.com` URL or a custom domain). It is used for canonical metadata and sitemap generation. If it is omitted, the build uses Render's `RENDER_EXTERNAL_URL` when available; otherwise the site still builds and runs without a canonical URL. Render provides HTTPS for its hosted static sites. To use a custom domain, update `VITE_SITE_URL` to that origin, add it in the service settings, and configure the DNS records Render shows there.

## Content and publishing notes

- Project details, reported results, experience, skills, profile, and award are centralized in `src/content.ts`.
- No résumé PDF, project repository links, backend, database, analytics, or secrets are required for the current site.
- The contact CTA opens the visitor's email application. A real server-side form requires a configured delivery service before it should claim submission.
- Deployment is static; there is no server process to keep running.
