'use client'
import Link from 'next/link'
import { Heart, Images, CalendarHeart, LogIn } from 'lucide-react'

export default function Nav(){
  return <nav className="nav glass">
    <Link href="/" className="brand"><Heart size={18} fill="currentColor"/> our little date</Link>
    <div className="navlinks">
      <Link href="/choose"><CalendarHeart size={17}/> Plan</Link>
      <Link href="/photos"><Images size={17}/> Photo wall</Link>
      <Link href="/login"><LogIn size={17}/> Login</Link>
    </div>
  </nav>
}
