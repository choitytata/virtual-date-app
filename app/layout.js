import './globals.css'

export const metadata = {
  title: 'Our Little Date',
  description: 'A whimsical virtual date planner for two.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
