import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

// We initialize the Fira Code font from Google Fonts.
// This is a "monospaced" font often used by developers.
const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira',
});

export const metadata: Metadata = {
  title: 'Soteras.dev',
  description: 'A glitchy, CRT-inspired software engineer portfolio.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning is needed for next-themes to avoid mismatch errors
    <html lang="en" suppressHydrationWarning>
      <body className={`${firaCode.variable} font-fira antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* This div acts as our CRT scanline overlay that covers the whole screen */}
          <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
