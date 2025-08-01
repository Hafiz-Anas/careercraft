import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CareerCraft - Create Professional CVs & Resumes Online',
  description: 'Craft your perfect career with CareerCraft. Create stunning, professional CVs and resumes with our modern online builder. Choose from premium templates and export as PDF.',
  keywords: 'CareerCraft, CV maker, resume builder, professional CV, online resume, career builder, job application',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}