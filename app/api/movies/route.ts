import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = searchParams.get('page') || '1'

    //const apiKey = process.env.TMDB_API_KEY
    const apiKey = process.env.NEXT_PUBLIC_TMDB_KEY


    if (!apiKey) {
      console.error('❌ Missing TMDB_API_KEY in .env')
      return NextResponse.json({ error: 'Server config error' }, { status: 500 })
    }

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
    )

    if (!res.ok) {
      console.error('❌ TMDB API failed:', res.status)
      return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json({ results: data.results })
  } catch (err) {
    console.error('❌ /api/movies crashed:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
