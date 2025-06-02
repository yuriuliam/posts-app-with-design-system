import { cx } from 'class-variance-authority'
import { Inter, Plus_Jakarta_Sans as PlusJakartaSans } from 'next/font/google'

const inter = Inter({
  fallback: ['sans-serif'],
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inter',
})

const plusJakartaSans = PlusJakartaSans({
  fallback: ['sans-serif'],
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-plus-jakarta-sans',
})

const nextFontFaceClassNames = cx(inter.variable, plusJakartaSans.variable)

export { nextFontFaceClassNames }
