import { GitHubSvg } from '@/components/svg'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nerdle',
  description: 'Words game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className='w-full flex justify-end items-center p-1'>
          <a href="https://github.com/TimKhakk/guessing-game-app">
            <GitHubSvg />
          </a>
        </header>
        {children}
      </body>
    </html>
  )
}
