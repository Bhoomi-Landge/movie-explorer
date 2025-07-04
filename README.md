# 🎬 Movie Explorer App

A sleek, responsive web application built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**, allowing users to explore movies from TMDB, register/login, and manage their favorite picks.

> 🔗 **Live Demo**:[https://vercel.com/bhoomis-projects-d94a3edc/movie-explorer-ahjz]

---

##  Features

-  **Authentication** using NextAuth.js (Register/Login)
-  **Popular & Genre-Based Movie Listings**
-  **Search** functionality with dynamic results
-  **Detailed Movie Page** (`/movie/[id]`) with overview, rating, and more
-  **Favorites** feature (stored in localStorage)
-  **Dark Mode** support via Tailwind
-  **Skeleton Loaders** for better UX
-  **Protected Routes** for authenticated users only
-  Deployed with Vercel

---

##  Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **NextAuth.js**
- **TMDB API**
- **localStorage** (for favorites)

---

## 📁 Project Structure
movie-explorer-app/
├── app/
│ ├── page.tsx # Landing redirect
│ ├── login/page.tsx # Login Page
│ ├── register/page.tsx # Register Page
│ ├── home/page.tsx # Main app (movies)
│ ├── movie/[id]/page.tsx # Movie Detail Page
│ ├── favorites/page.tsx # User's Favorites
├── components/
│ ├── MovieCard.tsx
│ ├── Navbar.tsx
│ └── SkeletonLoader.tsx
├── pages/api/
│ ├── register.ts # User registration API
│ └── auth/[...nextauth].ts # Auth config
├── public/
├── styles/
│ └── globals.css
├── .env.local
├── middleware.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md


---

##  Getting Started (Local Setup)

1. **Clone this repository:**
git clone https://github.com/YOUR_USERNAME/movie-explorer-app.git
cd movie-explorer-app

Install dependencies:

npm install
Configure Environment Variables:

Create a .env.local file:
NEXT_PUBLIC_TMDB_KEY=your_tmdb_api_key
NEXTAUTH_SECRET=your_random_secret

You can get a TMDB key from https://www.themoviedb.org/settings/api

Run the app:
npm run dev
The app will run on http://localhost:3000

📤 Submission
✅ GitHub Repository: https://github.com/Bhoomi-Landge/movie-explorer.git

✅ Live URL:[https://vercel.com/bhoomis-projects-d94a3edc/movie-explorer-ahjz]





