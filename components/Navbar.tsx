
'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Navbar({ onSearch }: { onSearch: (val: string) => void }) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 dark:from-gray-900 dark:to-gray-800 text-white px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md sticky top-0 z-50">
      {/* Title */}
      <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
        🎬 Movie Explorer
      </h1>

      {/* Search */}
   <input
  type="text"
  placeholder="Search movies..."
  onChange={(e) => onSearch(e.target.value)}
  className="transition-all duration-300 ease-in-out w-full sm:w-80 focus:w-96 rounded-full px-4 py-2 text-black outline-none focus:ring-4 focus:ring-yellow-300 shadow-sm"
/>

      {/* Right Side: Theme, Favorites, Logout */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="bg-white dark:bg-gray-600 text-blue-600 dark:text-yellow-300 px-3 py-1 rounded-full shadow-sm transition"
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

       < Link
  href="/favorites"
  className="bg-white dark:bg-neutral-900 text-blue-600 dark:text-yellow-300 font-semibold px-3 py-1 rounded hover:scale-105 transition"
>
  ★ Favorites
</Link>
<button
  onClick={() => signOut()}
  className="bg-white dark:bg-neutral-900 text-red-600 font-semibold px-3 py-1 rounded hover:scale-105 transition"
>
  🚪 Logout
</button>
       
      </div>
    </nav>
  )
}
