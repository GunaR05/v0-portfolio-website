import type { Metadata } from 'next'
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { CursorGlow } from '@/components/cursor-glow'
import { AIChatbot } from '@/components/ai-chatbot'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
})

export const metadata: Metadata = {
  title: 'Gunashree Rajakumar | Applied AI Systems Engineer',
  description: 'Applied AI Systems Engineer specializing in LLM integration, semantic search, and production-ready AI systems. Based in Boston, MA.',
  generator: 'v0.app',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='15' fill='%23020B18'/><text y='.9em' font-size='75' x='12' font-family='Arial' font-weight='bold' fill='%230066FF'>G</text></svg>",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CursorGlow />
          <AIChatbot />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
