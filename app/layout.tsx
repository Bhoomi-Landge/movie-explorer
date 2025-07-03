// // app/layout.tsx
// 'use client'

// import './globals.css'
// import { SessionProvider } from 'next-auth/react'
// import type { ReactNode } from 'react'

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <SessionProvider>
//           {children}
//         </SessionProvider>
//       </body>
//     </html>
//   )
// }
// app/layout.tsx
'use client'

import './globals.css'
import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
