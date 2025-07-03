import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'users.json')

export const getAllUsers = (): any[] => {
  if (!fs.existsSync(filePath)) return []
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

export const findUserByEmail = (email: string) => {
  const users = getAllUsers()
  return users.find((u) => u.email === email)
}

export const addUser = (user: any) => {
  const users = getAllUsers()
  users.push(user)
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}
