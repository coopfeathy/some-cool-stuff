import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Some Cool Stuff',
  description: 'A showcase of my web projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}