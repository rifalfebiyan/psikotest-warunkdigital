import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

import type { Metadata } from "next"

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Portal Asesmen DISC | Warunk Digital",
  description: "Asesmen psikometri perilaku profesional untuk mengenali gaya kerja dan komunikasi oleh Warunk Digital Indonesia.",
  openGraph: {
    title: "Portal Asesmen DISC | Warunk Digital",
    description: "Kenali gaya perilaku dan potensi Anda melalui instrumen asesmen DISC yang valid secara profesional.",
    siteName: "Warunk Digital Asesmen",
    locale: "id_ID",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
