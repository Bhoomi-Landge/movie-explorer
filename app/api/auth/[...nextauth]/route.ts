import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { promises as fs } from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'users.json')


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const fileContent = await fs.readFile(filePath, 'utf-8')
const users = JSON.parse(fileContent)
console.log('👤 Users:', users)

          const user = users.find((u: any) =>
            u.email.toLowerCase() === credentials?.email?.toLowerCase()
          )
          console.log('📁 Checking filePath:', filePath)
console.log('📁 All users:', users)

          console.log('🔍 Fetched user from JSON:', user)
          console.log('🔑 Provided credentials:', credentials)

          if (user && user.password === credentials?.password) {
            return user
          }

          return null
        } catch (err) {
          console.error('❌ Error reading users.json:', err)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'secret-key',
})

export { handler as GET, handler as POST }
