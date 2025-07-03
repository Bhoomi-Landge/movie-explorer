// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// import { v4 as uuid } from 'uuid'

// export default function RegisterPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [name, setName] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState(false)

//   const validatePassword = (pw: string) =>
//     /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.test(pw)

//   const validateEmail = (email: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault()
//   setError('')

//   if (!email || !name || !password || !confirmPassword) {
//     setError('All fields are required')
//     return
//   }

//   if (!validateEmail(email)) {
//     setError('Please enter a valid email address')
//     return
//   }

//   // ✅ Check if user already exists from server
//   const res = await fetch(`/api/users?email=${email}`)
//   const existing = await res.json()
//   if (existing) {
//     setError('User already exists')
//     return
//   }

//   if (!validatePassword(password)) {
//     setError('Password must be strong')
//     return
//   }

//   if (password !== confirmPassword) {
//     setError('Passwords do not match')
//     return
//   }

//   // ✅ Save new user to server
//   await fetch('/api/users', {
//     method: 'POST',
//     body: JSON.stringify({
//       id: uuid(),
//       email,
//       name,
//       password,
//     }),
//   })

//   setSuccess(true)
//   setTimeout(() => {
//     router.push('/login')
//   }, 1500)
// }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-pink-500">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-5">
//         <h1 className="text-2xl font-bold text-center text-blue-700">Register</h1>
//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         {success && (
//           <p className="text-green-600 text-sm text-center">User created! Redirecting...</p>
//         )}
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md"
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md"
//           />
//           <input
//             type="password"
//             placeholder="Strong Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md"
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="text-sm text-center">
//           Already have an account?{' '}
//           <a href="/login" className="text-blue-700 underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   )
// }







'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuid } from 'uuid'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const validatePassword = (pw: string) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.test(pw)

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')
  console.log('📤 Submitting register form')

  if (!email || !name || !password || !confirmPassword) {
    setError('All fields are required')
    return
  }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: uuid(),
      name,
      email,
      password,
    }),
  })

  const data = await res.json()
  console.log('📥 Register API response:', data)

  if (!res.ok) {
    setError(data.error || 'Something went wrong')
    return
  }

  setSuccess(true)
  setTimeout(() => {
    router.push('/login')
  }, 1500)
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-5">
        <h1 className="text-2xl font-bold text-center text-blue-700">Register</h1>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm text-center">User created! Redirecting...</p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Strong Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-700 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
