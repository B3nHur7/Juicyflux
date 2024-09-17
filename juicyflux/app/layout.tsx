import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JuicyFlux',
  description: 'AI Image Generation App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bungee+Spice&family=Kalnia+Glaze:wght@100..700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <div className="bg-[url('/background.png')] bg-cover bg-center bg-fixed min-h-screen">
          <div className="bg-black bg-opacity-70 min-h-screen">
            <header className="p-4 flex justify-center items-center">
              <h1 className="text-5xl font-bold animate-pulse" style={{ fontFamily: '"Kalnia Glaze", serif', background: 'linear-gradient(45deg, #ff00ff, #00ffff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>JuicyFlux</h1>
            </header>
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
