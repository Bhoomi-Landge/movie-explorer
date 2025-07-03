import { NextRequest, NextResponse } from 'next/server'

type User = {
  id: string
  name: string
  email: string
  password: string
}

let users: User[] = [] // ✅ server-side memory

// POST /api/users → Add new user
export async function POST(req: NextRequest) {
  const newUser = await req.json()
  users.push(newUser)
  return NextResponse.json({ success: true })
}

// GET /api/users?email=xyz@example.com → Get user by email
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  const user = users.find((u) => u.email === email)
  return NextResponse.json(user || null)
}
