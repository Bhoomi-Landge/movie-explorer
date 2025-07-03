'use client'

import { useEffect, useState } from 'react'
import MovieCard from '@/components/MovieCard'
import Navbar from '@/components/Navbar'
import { Movie } from '@/app/types'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([])

  useEffect(() => {
    const favs: Movie[] = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(favs)
  }, [])

  return (
    <div>
      <Navbar onSearch={() => {}} />
      <h2 className="text-2xl font-bold p-4">My Favorites</h2>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
