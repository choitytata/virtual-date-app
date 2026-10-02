'use client'
import { useState } from 'react'

export default function HeartBurst({children='💗', className=''}){
  const [bursts,setBursts]=useState([])
  function burst(){
    const id=Date.now()
    const hearts=Array.from({length:16},(_,i)=>({
      id:`${id}-${i}`,
      x:(Math.random()*140)-70,
      y:-30-(Math.random()*100),
      r:(Math.random()*80)-40,
      d:700+Math.random()*500,
      e:['💗','💖','💕','💘','✨'][Math.floor(Math.random()*5)]
    }))
    setBursts(v=>[...v,...hearts])
    setTimeout(()=>setBursts(v=>v.filter(h=>!h.id.startsWith(String(id)))),1400)
  }
  return <span className={`burstWrap ${className}`}>
    <button onClick={burst} className="heartButton" aria-label="send love">{children}</button>
    {bursts.map(h=><span key={h.id} className="flyingHeart" style={{'--x':`${h.x}px`,'--y':`${h.y}px`,'--r':`${h.r}deg`,'--d':`${h.d}ms`}}>{h.e}</span>)}
  </span>
}
