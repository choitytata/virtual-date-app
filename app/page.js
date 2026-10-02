'use client'
import Link from 'next/link'
import Nav from '../components/Nav'
import HeartBurst from '../components/HeartBurst'

export default function Home(){
  return <main className="page landing">
    <Nav/>
    <section className="hero card paper">
      <div className="sparkle s1">✦</div><div className="sparkle s2">✧</div><div className="sparkle s3">♡</div>
      <p className="eyebrow">a tiny world made for two</p>
      <h1>Welcome, let’s go on a date.</h1>
      <p className="lead">Pick a place, pack something sweet, and make a little memory together.</p>
      <div className="heroActions">
        <Link className="primary" href="/choose">Start our date →</Link>
        <HeartBurst>💗</HeartBurst>
      </div>
      <div className="doodleRow"><span>🌼</span><span>🧺</span><span>☁️</span><span>🌙</span><span>🎞️</span></div>
    </section>
  </main>
}
