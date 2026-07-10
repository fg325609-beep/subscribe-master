# SubScribe Master — Frontend

Foydalanuvchining pullik obunalarini boshqaruvchi, valyuta konvertatsiyasi va
xarajatlar statistikasini taqdim etuvchi Next.js (App Router) SPA.

## Texnologiyalar

- Next.js 14+ (App Router), TypeScript
- Tailwind CSS
- Zustand (global state)
- Axios + interceptor (JWT access/refresh token oqimi)
- React Hook Form + Zod (validatsiya)
- Recharts (grafiklar)
- MSW (backend mock uchun)
- Vitest + Testing Library (unit testlar)

## Ishga tushirish

### 1. Talablar
- Node.js 20+
- npm 10+

### 2. O'rnatish
\`\`\`bash
npm install
\`\`\`

### 3. Environment o'zgaruvchilari
\`.env.local.example\` faylidan nusxa oling:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

| O'zgaruvchi | Tavsif | Default |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API manzili | `http://localhost:4000/api` |

### 4. Development rejimida ishga tushirish
\`\`\`bash
npm run dev
\`\`\`
Brauzerda oching: http://localhost:3000

### 5. Testlarni ishga tushirish
\`\`\`bash
npm run test
\`\`\`

### 6. Production build (Docker orqali)
\`\`\`bash
docker compose up --build
\`\`\`
Ilova http://localhost:3000 manzilida ochiladi (ichkarida Nginx portida 80).

## Token xavfsizligi haqida izoh

Access token faqat brauzer xotirasida (Zustand, persist qilinmagan) saqlanadi —
sahifa yangilanganda yo'qoladi va `/auth/me` orqali qayta tiklanadi.
Refresh token — agar backend qo'llasa — **httpOnly cookie**da saqlanadi va
frontend unga umuman tegmaydi (XSS'dan himoyalangan). Agar backend cookie'ni
qo'llamasa, fallback sifatida refresh token localStorage'da saqlanishi mumkin,
biroq bu holat XSS xavfini oshiradi va faqat backend cookie imkoniyati
bo'lmagan taqdirda ishlatilishi tavsiya etiladi.

## Loyiha strukturasi

Qisqacha: `app/` — route'lar, `components/ui` — qayta ishlatiladigan "dumb"
komponentlar, `features/` — domen bo'yicha modullar (auth, subscriptions,
analytics, notifications, reports, admin, settings), `services/` — API bilan
aloqa, `store/` — Zustand global holat, `types/` — TypeScript interfeyslar.
Batafsil arxitektura tavsifi loyiha ichidagi texnik hujjatda keltirilgan.

## Ma'lum cheklovlar

- `output: "export"` statik export ishlatilgani sababli, kelajakda Server
  Actions yoki server-side render kerak bo'lsa, Dockerfile va
  `next.config.mjs` moslashtirilishi kerak.
- Admin panel funksiyalari backend'da `ADMIN` roli mavjudligiga bog'liq.# subscribe-master
# subscribe-master
