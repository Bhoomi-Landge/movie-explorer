
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MovieCard({ movie }: { movie: any }) {
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFav(favs.some((m: any) => m.id === movie.id))
  }, [movie.id])

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault() // prevent link navigation on button click
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
    let updated
    if (isFav) {
      updated = favs.filter((m: any) => m.id !== movie.id)
    } else {
      updated = [...favs, movie]
    }
    localStorage.setItem('favorites', JSON.stringify(updated))
    setIsFav(!isFav)
  }

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="relative bg-gradient-to-t from-slate-100 to-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-all">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="w-full h-[300px] object-cover"
          priority
        />
        <button
          onClick={toggleFav}
          className={`absolute top-2 right-2 text-xl p-2 rounded-full ${
            isFav ? 'bg-yellow-400 text-white' : 'bg-white text-yellow-400'
          } shadow-md hover:scale-110 transition`}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFav ? '★' : '☆'}
        </button>
        <div className="p-3">
          <h2 className="text-md font-semibold truncate text-gray-800">{movie.title}</h2>
          <p className="text-sm text-yellow-600 font-semibold">⭐ {movie.vote_average}</p>
        </div>
      </div>
    </Link>
  )
}
