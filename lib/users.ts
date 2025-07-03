'use client' // enable client-side localStorage access

export type User = {
  id: string
  name: string
  email: string
  password: string
}

export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem('users')
  return data ? JSON.parse(data) : []
}

export const addUser = (user: User) => {
  const users = getUsers()
  localStorage.setItem('users', JSON.stringify([...users, user]))
}

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers()
  return users.find((u) => u.email === email)
}
