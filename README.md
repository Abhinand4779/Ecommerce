# Aurelia Jewels — E-commerce Frontend

A modern, Flipkart-inspired jewellery e-commerce platform built with **Vite + React 18**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── app/                  # Page components (file-based routing via React Router)
│   ├── page.tsx          # Homepage
│   ├── shop/             # Shop & product detail pages
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout & order success
│   ├── login/            # Sign in page
│   ├── register/         # Register page
│   ├── profile/          # User profile
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── admin/            # Admin dashboard (protected)
│   └── globals.css       # Global styles & design tokens
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── ui/               # Reusable UI pieces (HeroBanner, CategoryBanner, etc.)
│   └── admin/            # AdminSidebar, AdminLogin
├── context/
│   ├── AuthContext.tsx   # Auth state (sign in / register / guest)
│   └── CartContext.tsx   # Cart state
├── data/
│   └── products.ts       # Local product catalogue
└── App.tsx               # Root router & layout
```

---

## 🎯 Pages & Routes

| Route | Page |
|---|---|
| `/` | Homepage — hero, categories, deals, carousels |
| `/shop` | Product listing with filters & sort |
| `/shop/:slug` | Product detail page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout & payment selection |
| `/checkout/success` | Order confirmation |
| `/login` | Sign in |
| `/register` | Create account |
| `/profile` | User profile |
| `/about` | About Aurelia Jewels |
| `/contact` | Contact form |
| `/admin` | Admin dashboard (password protected) |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Blue | `#2874f0` |
| Gold Accent | `#D4AF37` |
| Background | `#f1f3f6` |
| Success Green | `#388e3c` |
| Orange CTA | `#ff9f00` |
| Text Dark | `#212121` |
| Text Gray | `#878787` |

**Typography**: Roboto (primary) · Inter (secondary)

---

## 🔐 Admin Access

Navigate to `/admin`. Default credentials (configurable via `.env`):

```
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=password
```

> ⚠️ This is a client-side gate for development only. Use a proper server-side session for production.

---

## 🛠️ Tech Stack

- **Vite 7** — build tool
- **React 18** — UI library
- **TypeScript 5** — type safety
- **Tailwind CSS 3** — utility-first styling
- **React Router 7** — client-side routing
- **Framer Motion** — animations
- **Lucide React** — icons
- **Swiper** — carousels
