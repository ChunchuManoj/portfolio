import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chunchu Manoj | Portfolio",
  description: "Software Developer, AI Enthusiast, and Web Developer",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Force scroll to top on page load
            if (typeof window !== 'undefined') {
              window.history.scrollRestoration = 'manual';
              
              // Immediate scroll to top
              window.scrollTo(0, 0);
              
              // Clear any hash fragments
              if (window.location.hash) {
                window.history.replaceState(null, '', window.location.pathname);
              }
              
              // Add event listener for when DOM is fully loaded
              document.addEventListener('DOMContentLoaded', function() {
                window.scrollTo(0, 0);
                
                // Prevent any automatic focus on elements
                document.querySelectorAll('input, textarea').forEach(el => {
                  el.blur();
                });
              });
              
              // Final attempt after window loads
              window.addEventListener('load', function() {
                setTimeout(function() {
                  window.scrollTo(0, 0);
                }, 0);
              });
            }
          `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'