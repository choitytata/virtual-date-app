'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import html2canvas from 'html2canvas'
import Nav from '../../components/Nav'
import Couple from '../../components/Couple'
import HeartBurst from '../../components/HeartBurst'
import { getSupabase } from '../../lib/supabase'

const notes=[
 'I’d choose this little moment with you in every universe(say you love me twice). 💌',
 'Thank you for loving me even though im a mess. 🌷',
 'You are my favorite person to bitch around. 🤍',
 'I hope we keep doing kaijjas. ✨',
 'One date down, a lifetime of little dates to go(till bilkis comes). 💗'
]

const names={outdoor:'Picnic Meadow',indoor:'Cozy Room',movies:'Movie Night',garden:'Secret Garden',stargazing:'Stargazing'}

const conversations={
 outdoor:[
  ['This picnic feels straight out of a storybook.','Then let’s stay in this page a little longer.'],
  ['The breeze is being extra sweet today.','Maybe it knows I’m here with you.'],
  ['What should we taste first?','Whatever we share together tastes better.']
 ],
 stargazing:[
  ['Do you see that bright star over there?','Yes… I think it is cheering for us.'],
  ['If you could name a star tonight, what would you call it?','Probably something that reminds me of you.'],
  ['The moon makes everything feel softer.','Especially this moment with you.']
 ],
 indoor:[
  ['This room feels so cozy with you here.','Then come a little closer and stay awhile.'],
  ['I could spend all evening on this sofa with you.','Same, especially with snacks and flowers nearby.'],
  ['Should we talk or just enjoy this quiet?','Both… your voice and your silence are lovely.']
 ],
 movies:[
  ['The movie is good, but I keep looking at you.','Then share the popcorn and pretend I didn’t blush.'],
  ['This scene feels magical.','Not as magical as holding your hand in the dark.'],
  ['Do you think the ending will be happy?','It already is. I’m here with you.']
 ],
 garden:[
  ['These flowers look like they’re smiling today.','Maybe they like watching us together.'],
  ['The garden feels so peaceful.','You make every place feel peaceful.'],
  ['Let’s walk a little after the picnic.','Only if I get to keep holding your hand.']
 ]
}

const starItems=['✦','✦','⭐','✦','·','✦','⭐','✦','·','✦','⭐','✦']

function randomPair(place){
 const pool=conversations[place] || conversations.outdoor
 return pool[Math.floor(Math.random()*pool.length)]
}

function SceneDecor({place}){
 if(place==='stargazing'){
  return <>
   <div className="moon">🌙</div>
   <div className="starField">{starItems.map((s,i)=><span key={i} className={`star s${i+1}`}>{s}</span>)}</div>
   <div className="hill hill1"></div>
   <div className="hill hill2"></div>
   <div className="miniTree tree1">🌲</div>
   <div className="miniTree tree2">🌳</div>
   <div className="miniTree tree3">🌲</div>
   <div className="blanket"></div>
   <div className="basket">🧺</div>
  </>
 }
 if(place==='indoor'){
  return <>
   <div className="roomGlow"></div>
   <div className="window"></div>
   <div className="frame frame1">♡</div>
   <div className="frame frame2">✿</div>
   <div className="bookshelf"></div>
   <div className="lamp"></div>
   <div className="sofa"></div>
   <div className="coffeeTable"></div>
  </>
 }
 if(place==='movies'){
  return <>
   <div className="movieScreen"></div>
   <div className="movieGlow"></div>
   <div className="seatRow back">{Array.from({length:8},(_,i)=><span key={i} className="seat"></span>)}</div>
   <div className="seatRow middle">{Array.from({length:7},(_,i)=><span key={i} className="seat"></span>)}</div>
   <div className="seatRow front">{Array.from({length:6},(_,i)=><span key={i} className="seat"></span>)}</div>
   <div className="coupleLight"></div>
  </>
 }
 if(place==='garden'){
  return <>
   <div className="gardenArch"></div>
   <div className="gardenBush bush1"></div>
   <div className="gardenBush bush2"></div>
   <div className="gardenBush bush3"></div>
   <div className="gardenFlowers flowers1">🌼 🌷</div>
   <div className="gardenFlowers flowers2">🌸 🌼</div>
   <div className="gardenPath"></div>
   <div className="tree gardenTree">🌳</div>
   <div className="blanket"></div>
   <div className="basket">🧺</div>
  </>
 }
 return <>
  <div className="tree">🌳</div>
  <div className="blanket"></div>
  <div className="basket">🧺</div>
 </>
}

export default function DatePage(){
 const [place,setPlace]=useState('outdoor')
 const [foods,setFoods]=useState([])
 const [flower,setFlower]=useState('🌷 Tulips')
 const [note,setNote]=useState(null)
 const [saved,setSaved]=useState(false)
 const [count,setCount]=useState(0)
 const [noteIndex,setNoteIndex]=useState(0)
 const [[line1,line2],setLines]=useState(conversations.outdoor[0])
 const scene=useRef(null)
 const r=useRouter()

 useEffect(()=>{
  const nextPlace=localStorage.getItem('date_place')||'outdoor'
  setPlace(nextPlace)
  try{setFoods(JSON.parse(localStorage.getItem('date_foods')||'[]'))}catch{}
  setFlower(localStorage.getItem('date_flower')||'🌷 Tulips')
  setCount(Number(localStorage.getItem('date_count')||0))
  setLines(randomPair(nextPlace))
 },[])

 useEffect(()=>{
  setLines(randomPair(place))
  const id=setInterval(()=>setLines(randomPair(place)),4200)
  return ()=>clearInterval(id)
 },[place])

 async function saveDate(){
   if(saved) return
   const next=count+1
   setCount(next)
   setSaved(true)
   localStorage.setItem('date_count',String(next))
   try{
    const supa=getSupabase()
    const {data:{user}}=await supa.auth.getUser()
    if(user) await supa.from('dates').insert({user_id:user.id,place,foods,flower})
   }catch{}
 }

 async function makeSelfie(){
   if(!scene.current) return
   const canvas=await html2canvas(scene.current,{backgroundColor:null,scale:2})
   const data=canvas.toDataURL('image/png')
   const oldSelfies = JSON.parse(localStorage.getItem('selfies') || '[]')

const newSelfie = {
  id: Date.now(),
  image_url: data,
  place,
  created_at: new Date().toISOString()
}

localStorage.setItem(
  'selfies',
  JSON.stringify([newSelfie, ...oldSelfies])
)
   try{
    const supa=getSupabase()
    const {data:{user}}=await supa.auth.getUser()
    if(user){
      const blob=await (await fetch(data)).blob()
      const path=`${user.id}/${Date.now()}.png`
      await supa.storage.from('selfies').upload(path,blob,{contentType:'image/png'})
      const {data:pub}=supa.storage.from('selfies').getPublicUrl(path)
      await supa.from('selfies').insert({user_id:user.id,image_url:pub.publicUrl,place})
    }
   }catch{}
   r.push('/photos')
 }

 function openNote(){
  setNote(notes[noteIndex])
  setNoteIndex((noteIndex+1)%notes.length)
 }

 return <main className={`page scenePage ${place}`}><Nav/><section className="wide">
  <div className="dateHeader"><div><p className="eyebrow">our date # {count+1}</p><h1 className="title">{names[place]}</h1></div><button className="secondary" onClick={saveDate}>{saved?'Date saved ♡':'Save this date'}</button></div>
  <div ref={scene} className="dateScene paper">
    {(place==='outdoor' || place==='stargazing' || place==='garden') && <div className="skybits"><span>☁️</span><span>✦</span><span>🦋</span><span>♡</span></div>}
    {place==='indoor' && <div className="roomBits"><span>♡</span><span>✦</span></div>}
    {place==='movies' && <div className="movieBits"><span>★</span><span>♡</span></div>}
    <SceneDecor place={place} />
    <Couple place={place} lines={[line1,line2]} />
    <div className="spread">{foods.map((x,i)=><span key={i}>{x.split(' ')[0]}</span>)}<span>{flower.split(' ')[0]}</span></div>
    {place==='movies' && <div className="moviePopcorn">🍿</div>}
    <div className="loveFloat"><HeartBurst>💞</HeartBurst></div>
  </div>
  <div className="dateControls">
    <button className="primary" onClick={makeSelfie}>📸 Take a virtual selfie</button>
    <button className="envelope" onClick={openNote}>💌 open a note</button>
  </div>
  {note && <div className="modal" onClick={()=>setNote(null)}><div className="note paper" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setNote(null)}>×</button><p>{note}</p><small>click the envelope again for another note</small></div></div>}
 </section></main>
}
