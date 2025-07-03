// // app/movie/[id]/page.tsx
// 'use client'

// import Image from 'next/image'
// import { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'

// export default function MovieDetailPage() {
//   const { id } = useParams()
//   const [movie, setMovie] = useState<any>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchMovie = async () => {
//       setLoading(true)
//       const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`)
//       const data = await res.json()
//       setMovie(data)
//       setLoading(false)
//     }

//     if (id) fetchMovie()
//   }, [id])

//   if (loading) {
//     return (
//       <div className="max-w-5xl mx-auto p-4 animate-pulse">
//         <div className="h-[300px] bg-gray-300 mb-4 rounded" />
//         <div className="h-6 bg-gray-300 w-2/3 mb-2 rounded" />
//         <div className="h-4 bg-gray-300 w-1/2 mb-1 rounded" />
//         <div className="h-4 bg-gray-300 w-1/3 mb-1 rounded" />
//         <div className="h-4 bg-gray-300 w-full rounded" />
//       </div>
//     )
//   }

//   if (!movie) return <p className="text-center mt-8">Movie not found.</p>

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <div className="grid md:grid-cols-2 gap-6">
//         <Image
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//           width={500}
//           height={750}
//           className="rounded-lg shadow-lg object-cover w-full"
//         />
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
//           <p className="text-gray-700 text-sm mb-4">{movie.overview}</p>
//           <p className="font-semibold">⭐ Rating: {movie.vote_average}</p>
//           <p className="font-semibold">📅 Release: {movie.release_date}</p>
//           <div className="mt-3 flex flex-wrap gap-2">
//             {movie.genres?.map((g: any) => (
//               <span key={g.id} className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
//                 {g.name}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// // app/movie/[id]/page.tsx
// import Image from 'next/image'

// // Fetch movie details
// async function getMovie(id: string) {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
//   )
//   return res.json()
// }

// export async function generateStaticParams() {
//   const res = await fetch(
//    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
//   )
//   const data = await res.json()

//   return data.results.slice(0, 10).map((movie: any) => ({
//     id: movie.id.toString(),
//   }))
// }

// export default async function MovieDetailPage({ params }: { params: { id: string } }) {
//   const movie = await getMovie(params.id)

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <div className="grid md:grid-cols-2 gap-6">
//         <Image
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//           width={500}
//           height={750}
//           className="rounded-lg shadow-lg object-cover w-full"
//         />
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
//           <p className="text-gray-700 text-sm mb-4">{movie.overview}</p>
//           <p className="font-semibold">⭐ Rating: {movie.vote_average}</p>
//           <p className="font-semibold">📅 Release: {movie.release_date}</p>
//           <div className="mt-3 flex flex-wrap gap-2">
//             {movie.genres?.map((g: any) => (
//               <span
//                 key={g.id}
//                 className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full"
//               >
//                 {g.name}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function MovieDetailPage() {
  const { id } = useParams()
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`)
      const data = await res.json()
      setMovie(data)
      setLoading(false)
    }

    if (id) fetchMovie()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4 animate-pulse">
        <div className="h-[300px] bg-gray-300 mb-4 rounded" />
        <div className="h-6 bg-gray-300 w-2/3 mb-2 rounded" />
        <div className="h-4 bg-gray-300 w-1/2 mb-1 rounded" />
        <div className="h-4 bg-gray-300 w-1/3 mb-1 rounded" />
        <div className="h-4 bg-gray-300 w-full rounded" />
      </div>
    )
  }

  if (!movie) return <p className="text-center mt-8">Movie not found.</p>

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="rounded-lg shadow-lg object-cover w-full"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-700 text-sm mb-4">{movie.overview}</p>
          <p className="font-semibold">⭐ Rating: {movie.vote_average}</p>
          <p className="font-semibold">📅 Release: {movie.release_date}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {movie.genres?.map((g: any) => (
              <span key={g.id} className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
