'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '../../components/Nav'

const foods=['🍓 Strawberries','🍰 Cake','🍗 Chicken Fry','🍕 Mini pizza','🍣 Sushi','🧋 Bubble tea','☕ Coffee','🍪 Cookies']
const flowers=['🌷 Tulips','🌹 Roses','🌼 Daisies','🌻 Sunflowers','🪻 Lavender','🌸 Cherry blossoms']

export default function Picks(){
 const r=useRouter(); const [f,setF]=useState([]); const [fl,setFl]=useState('🌷 Tulips')
 useEffect(()=>{ try{setF(JSON.parse(localStorage.getItem('date_foods')||'[]'));setFl(localStorage.getItem('date_flower')||'🌷 Tulips')}catch{} },[])
 const toggle=(x)=>setF(v=>v.includes(x)?v.filter(a=>a!==x):[...v,x].slice(-5))
 function next(){localStorage.setItem('date_foods',JSON.stringify(f));localStorage.setItem('date_flower',fl);r.push('/date')}
 return <main className="page"><Nav/><section className="wide">
  <p className="eyebrow">step 2 of 3</p><h1 className="title">Pack our little date basket</h1>
  <div className="pickerPanel paper"><h2>Pick up to 5 treats</h2><div className="chips">{foods.map(x=><button key={x} className={f.includes(x)?'chip active':'chip'} onClick={()=>toggle(x)}>{x}</button>)}</div>
  <h2>Choose flowers</h2><div className="chips">{flowers.map(x=><button key={x} className={fl===x?'chip active':'chip'} onClick={()=>setFl(x)}>{x}</button>)}</div>
  <button className="primary" onClick={next} disabled={!f.length}>Set up our date →</button></div>
 </section></main>
}
