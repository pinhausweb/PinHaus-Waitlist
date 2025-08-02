import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "PINHAUS - DISCOVER MICRO-TRENDS IN FASHION",
  description:
    "Shop sustainably, save money, and stay on top of the latest fashion micro-trends with our innovative pin system.",
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
