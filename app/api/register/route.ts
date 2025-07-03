import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'users.json')

export async function POST(req: Request) {
  try {
    const newUser = await req.json()

    // Read existing users or initialize empty array
    let users = []
    try {
      const fileData = await fs.readFile(filePath, 'utf-8')
      users = JSON.parse(fileData)
    } catch {
      console.log('📂 users.json not found, creating new one.')
    }

    // Prevent duplicates
    const exists = users.find((u: any) => u.email === newUser.email)
    if (exists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Add user
    users.push(newUser)
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8')

    console.log('✅ Registered user:', newUser.email)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('❌ Registration Error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
