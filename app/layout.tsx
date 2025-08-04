import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'PinHaus',
  description: 'Join the PinHaus waitlist',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
  height: 100%;
  overflow-x: hidden;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

/* Fix for mobile keyboard issues */
@media screen and (max-width: 768px) {
  html, body {
    height: 100vh;
    height: -webkit-fill-available;
    min-height: -webkit-fill-available;
  }
  
  /* Prevent white space when keyboard appears */
  body {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
  }
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
