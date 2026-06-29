# 🏎️ Waquar Ahmad — 3D Automotive Animator Portfolio

A production-ready, cinematic portfolio with a **Next.js 14** frontend and **Node/Express/Mongoose** backend.

---

## 📁 Monorepo Structure

```
waquar-portfolio/
├── backend/                     # Node.js · Express · Mongoose
│   ├── server.js                # Entry point
│   ├── src/
│   │   ├── app.js               # Express app (middleware stack)
│   │   ├── config/              # DB, CORS, Cloudinary, env validation
│   │   ├── models/              # Mongoose schemas
│   │   ├── repositories/        # Data-access layer (BaseRepository pattern)
│   │   ├── services/            # Business logic
│   │   ├── controllers/         # HTTP request/response handlers
│   │   ├── routes/              # Express routers
│   │   ├── middlewares/         # Auth, error, rate-limit, CORS, validate
│   │   ├── validators/          # express-validator rule sets
│   │   └── utils/               # ApiError, ApiResponse, asyncHandler, logger
│   ├── uploads/                 # Local file storage (dev only)
│   └── logs/                    # Winston log files
│
└── frontend/                    # Next.js 14 App Router · TypeScript
    ├── next.config.js           # Image domains, security headers, ISR
    ├── tailwind.config.js       # Racing theme tokens
    ├── src/
    │   ├── app/                 # App Router pages + layouts
    │   │   ├── layout.tsx       # Root layout · JSON-LD · fonts
    │   │   ├── page.tsx         # Homepage (ISR, revalidate 10min)
    │   │   ├── sitemap.ts       # Dynamic XML sitemap (auto project slugs)
    │   │   ├── robots.ts        # robots.txt
    │   │   ├── about/page.tsx
    │   │   ├── projects/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx  # Per-project metadata + SSG
    │   │   ├── work/page.tsx
    │   │   └── contact/page.tsx
    │   │
    │   ├── components/
    │   │   ├── 3d/
    │   │   │   ├── car/         # F1Car, CarGeometry, CarMaterials, WheelGroup
    │   │   │   ├── environment/ # GarageScene, NeonLights, Floor, TunnelWalls
    │   │   │   └── effects/     # ParticleSystem, SmokeEffect, SpeedLines, MotionBlur
    │   │   ├── layout/          # Navbar, Footer, PageTransition, SEOHead
    │   │   ├── sections/        # Hero, About, Projects, Skills, Stats, Contact
    │   │   └── ui/              # Button, ProjectCard, SkillBadge, HUDOverlay, etc.
    │   │
    │   ├── hooks/               # useScroll, useThree, useScrollPhase, useCarControls
    │   ├── lib/
    │   │   ├── three/           # sceneBuilder, cameraController, carBuilder, particles
    │   │   ├── gsap/            # scrollTrigger, animations, transitions
    │   │   └── seo/             # metadata, structuredData, openGraph helpers
    │   ├── store/               # Zustand stores (portfolio, UI, scroll)
    │   ├── types/               # TypeScript interfaces
    │   ├── utils/               # api fetcher, cn(), formatters
    │   ├── config/              # site, api, animation, seo configs
    │   └── styles/              # globals, fonts, animations, variables
    └── public/
        ├── fonts/               # Self-hosted fonts
        ├── icons/               # SVG icons + favicon
        ├── videos/              # Fallback video loops
        └── models/              # .glb / .gltf 3D models
```

---

## 🚀 Quick Start

### Backend
```bash
cd backend
cp .env.example .env    # fill in your values
npm install
npm run dev             # http://localhost:5000
```

### Frontend
```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev             # http://localhost:3000
```

---

## 🏗️ Backend Architecture — MVC + Service + Repository

```
HTTP Request
    ↓
Router          (routes/)         — maps URL + method → controller
    ↓
Middleware      (middlewares/)    — auth · validate · rateLimit
    ↓
Controller      (controllers/)    — receives req/res, delegates to service
    ↓
Service         (services/)       — business rules, orchestration
    ↓
Repository      (repositories/)   — all DB queries (extends BaseRepository)
    ↓
Model           (models/)         — Mongoose schema definition
    ↓
MongoDB
```

**Why this structure?**
- Controllers stay thin — no business logic, just HTTP
- Services are unit-testable without a DB
- Repositories are the single source of DB truth — swap Mongoose for anything later
- BaseRepository provides paginate, findAll, findById, create, updateById, deleteById

---

## 🌐 REST API Endpoints

| Method | Endpoint                        | Auth | Description              |
|--------|---------------------------------|------|--------------------------|
| GET    | /api/v1/health                  | —    | Server health check      |
| GET    | /api/v1/projects                | —    | All published projects   |
| GET    | /api/v1/projects/featured       | —    | Featured projects        |
| GET    | /api/v1/projects/:slug          | —    | Single project by slug   |
| POST   | /api/v1/projects                | ✅   | Create project           |
| PUT    | /api/v1/projects/:id            | ✅   | Update project           |
| DELETE | /api/v1/projects/:id            | ✅   | Delete project           |
| GET    | /api/v1/skills                  | —    | All skills               |
| POST   | /api/v1/skills                  | ✅   | Add skill                |
| PUT    | /api/v1/skills/:id              | ✅   | Update skill             |
| DELETE | /api/v1/skills/:id              | ✅   | Delete skill             |
| GET    | /api/v1/about                   | —    | About section data       |
| PUT    | /api/v1/about                   | ✅   | Upsert about data        |
| POST   | /api/v1/contact                 | —    | Submit contact form      |
| GET    | /api/v1/contact                 | ✅   | View all messages        |
| PATCH  | /api/v1/contact/:id             | ✅   | Update message status    |

---

## 🎯 Frontend SEO Strategy

| Feature            | Implementation                                       |
|--------------------|------------------------------------------------------|
| Metadata           | `generateMetadata()` in every page.tsx               |
| Dynamic OG images  | Per-project open graph with cloudinary thumbnail     |
| JSON-LD            | Person schema + CreativeWorkSeries portfolio schema  |
| Sitemap            | `/sitemap.xml` auto-generated with all project slugs |
| robots.txt         | `/robots.ts` via Next.js                             |
| ISR                | Homepage revalidates every 10 min                    |
| Static paths       | `generateStaticParams()` pre-builds all project pages|
| Canonical URLs     | Set in every page metadata                           |
| Performance        | next/image, next/font, sharp, avif/webp              |

---

## 🛡️ Security

- `helmet` — HTTP security headers
- `express-mongo-sanitize` — prevent NoSQL injection
- `hpp` — prevent HTTP parameter pollution
- `express-rate-limit` — 100 req/15min per IP
- `cors` — whitelist only your domain
- `express-validator` — all inputs validated before controller
- JWT — admin routes protected
- `.env` — never committed, `.gitignore` enforced

---

## 📦 Key Dependencies

### Backend
`express` · `mongoose` · `jsonwebtoken` · `bcryptjs` · `multer` · `cloudinary` · `nodemailer` · `winston` · `helmet` · `express-rate-limit`

### Frontend
`next 14` · `react 18` · `three.js` · `@react-three/fiber` · `@react-three/drei` · `gsap` · `framer-motion` · `zustand` · `lenis` · `typescript` · `tailwindcss`
