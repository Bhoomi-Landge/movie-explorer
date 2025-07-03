// const API_KEY = process.env.TMDB_API_KEY
const API_KEY =process.env.NEXT_PUBLIC_TMDB_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export async function fetchPopularMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`, {
    next: { revalidate: 60 }, // cache for 60s
  })

  if (!res.ok) throw new Error('Failed to fetch movies')
  const data = await res.json()
  return data.results
}
