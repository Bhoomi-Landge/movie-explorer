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
    setSuccess(false)

    if (!email || !name || !password || !confirmPassword) {
      setError('All fields are required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!validatePassword(password)) {
      setError(
        'Password must contain uppercase, lowercase, number, special character, and be at least 8 characters long'
      )
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
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

    if (!res.ok) {
      setError(data.error || 'Something went wrong')
      return
    }

    setSuccess(true)
    setTimeout(() => {
      router.push('/login')
    }, 2500)
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-700">Create Your Account</h2>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        {success && <p className="text-green-500 text-center text-sm">User created! Redirecting...</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300"
          />
          <input
            type="password"
            placeholder="Strong Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md border-gray-300"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        
        
        {!success && (
  <div className="text-md text-center mt-4 border-t border-gray-200 pt-4 text-black font-medium">
    Already have an account?{' '}
    <a href="/login" className="text-blue-700 text-lg hover:underline">
      Login
    </a>
  </div>
)}


        
      </div>
    </div>
  )
}
