'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import MovieCard from '@/components/MovieCard'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [movies, setMovies] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMovies(page)
    }
  }, [page, status])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
        setPage((prev) => prev + 1)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading])

  const fetchMovies = async (page: number) => {
    setLoading(true)
    const res = await fetch(`/api/movies?page=${page}`)
    const data = await res.json()
    setMovies((prev) => [...prev, ...data])
    setLoading(false)
  }

  if (status === 'loading') {
    return <p className="text-center mt-6">Loading...</p>
  }

  if (status === 'unauthenticated') {
    return <p className="text-center mt-6">Redirecting to login...</p> // ✅ SAFE here
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">🎬 Popular Movies</h1>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {loading && <p className="text-center mt-6 text-gray-600">Loading more movies...</p>}
    </main>
  )
}
