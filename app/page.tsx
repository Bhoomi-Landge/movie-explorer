
// 'use client'

// import { useEffect, useState } from 'react'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import MovieCard from '@/components/MovieCard'
// import Navbar from '@/components/Navbar'

// const GENRES = [
//   { name: 'All', id: null },
//   { name: 'Action', id: 28 },
//   { name: 'Romance', id: 10749 },
//   { name: 'Comedy', id: 35 },
//   { name: 'Horror', id: 27 },
//   { name: 'Thriller', id: 53 },
//   { name: 'Adventure', id: 12 },
//   { name: 'Drama', id: 18 },
//   { name: 'Animation', id: 16 },
//   { name: 'Sci-Fi', id: 878 },
// ]

// export default function HomePage() {
//   const { status } = useSession()
//   const router = useRouter()

//   const [movies, setMovies] = useState<any[]>([])
//   const [page, setPage] = useState(1)
//   const [query, setQuery] = useState('')
//   const [genre, setGenre] = useState<number | ''>('')
//   const [loading, setLoading] = useState(false)
  

//   useEffect(() => {
//     if (status === 'unauthenticated') router.replace('/login')
//   }, [status])

//   useEffect(() => {
//     if (status === 'authenticated') fetchMovies()
//   }, [page, genre])

//   useEffect(() => {
//     if (query.length > 1) {
//       setPage(1)
//       fetchMovies()
//     }
//   }, [query])

//   const fetchMovies = async () => {
//     setLoading(true)
//     const endpoint = query
//       ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&query=${query}`
//       : genre
//         ? `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&with_genres=${genre}&page=${page}`
//         : `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${page}`

//     const res = await fetch(endpoint)
//     const data = await res.json()
//     const results = data.results || []

//     setMovies((prev) => (page === 1 ? results : [...prev, ...results]))
//     setLoading(false)
//   }

//   if (status === 'loading') return <p className="text-center mt-8">Loading...</p>

//   return (
//     // <div className="max-w-7xl mx-auto">
//       <div className="w-full">

//       <Navbar onSearch={setQuery} />

//       {/* Genre Buttons */}
//       <div className="flex flex-wrap justify-center gap-2 my-4 px-4">
//         {GENRES.map((g) => (
//           <button
//             key={g.name}
//             onClick={() => {
//               setGenre(g.id || '')
//               setPage(1)
//             }}
//             className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all
//               ${genre === g.id
//                 ? 'bg-yellow-400 text-black'
//                 : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}`}
//           >
//             <span className="text-lg">
//               {g.name === 'Action' && '🎯'}
//               {g.name === 'Romance' && '💖'}
//               {g.name === 'Comedy' && '😂'}
//               {g.name === 'Horror' && '👻'}
//               {g.name === 'Thriller' && '🔪'}
//               {g.name === 'Adventure' && '🌍'}
//               {g.name === 'Drama' && '🎭'}
//               {g.name === 'Animation' && '🎨'}
//               {g.name === 'Sci-Fi' && '🚀'}
//               {g.name === 'All' && '🌈'}
//             </span>
//             {g.name}
//           </button>
//         ))}
//       </div>

//       {/* Movie Cards or Skeletons */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
//         {loading
//           ? Array.from({ length: 8 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-200 h-[300px] rounded-lg animate-pulse"
//               />
//             ))
//           : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
//       </div>

//       {/* Load More */}
//       {!loading && (
//         <div className="text-center my-10">
//           <button
//             onClick={() => setPage((p) => p + 1)}
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }
'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import MovieCard from '@/components/MovieCard'
import Navbar from '@/components/Navbar'

interface Movie {
  id: number
  title: string
  poster_path?: string
  overview?: string
  release_date?: string
  [key: string]: any
}

const GENRES = [
  { name: 'All', id: null },
  { name: 'Action', id: 28 },
  { name: 'Romance', id: 10749 },
  { name: 'Comedy', id: 35 },
  { name: 'Horror', id: 27 },
  { name: 'Thriller', id: 53 },
  { name: 'Adventure', id: 12 },
  { name: 'Drama', id: 18 },
  { name: 'Animation', id: 16 },
  { name: 'Sci-Fi', id: 878 },
]

export default function HomePage() {
  const { status } = useSession()
  const router = useRouter()

  const [movies, setMovies] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState<number | ''>('')
  const [loading, setLoading] = useState(false)

  // Deduplicated movies for rendering
  const uniqueMovies = Array.from(new Map(movies.map((m) => [m.id, m])).values())

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login')
  }, [status])

  useEffect(() => {
    if (status === 'authenticated') fetchMovies()
  }, [page, genre])

  useEffect(() => {
    if (query.length > 1) {
      setPage(1)
      fetchMovies()
    }
  }, [query])

  const fetchMovies = async () => {
    setLoading(true)
    const endpoint = query
      ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&query=${query}`
      : genre
        ? `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&with_genres=${genre}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&page=${page}`

    const res = await fetch(endpoint)
    const data = await res.json()
    const results = data.results || []

    setMovies((prev) => {
      if (page === 1) return results

      const existingIds = new Set(prev.map((m) => m.id))
      const newMovies: Movie[] = results.filter((m: Movie) => !existingIds.has(m.id))
      return [...prev, ...newMovies]
    })

    setLoading(false)
  }

  if (status === 'loading') return <p className="text-center mt-8">Loading...</p>

  return (
    <div className="w-full">
      <Navbar onSearch={setQuery} />

      {/* Genre Buttons */}
      <div className="flex flex-wrap justify-center gap-2 my-4 px-4">
        {GENRES.map((g) => (
          <button
            key={g.name}
            onClick={() => {
              setGenre(g.id || '')
              setPage(1)
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all
              ${genre === g.id
                ? 'bg-yellow-400 text-black'
                : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}`}
          >
            <span className="text-lg">
              {g.name === 'Action' && '🎯'}
              {g.name === 'Romance' && '💖'}
              {g.name === 'Comedy' && '😂'}
              {g.name === 'Horror' && '👻'}
              {g.name === 'Thriller' && '🔪'}
              {g.name === 'Adventure' && '🌍'}
              {g.name === 'Drama' && '🎭'}
              {g.name === 'Animation' && '🎨'}
              {g.name === 'Sci-Fi' && '🚀'}
              {g.name === 'All' && '🌈'}
            </span>
            {g.name}
          </button>
        ))}
      </div>

      {/* Movie Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-200 h-[300px] rounded-lg animate-pulse" />
            ))
          : uniqueMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
      </div>

      {/* Load More */}
      {!loading && (
        <div className="text-center my-10">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
