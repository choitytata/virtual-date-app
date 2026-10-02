'use client'
import { useRouter } from 'next/navigation'
import Nav from '../../components/Nav'

const places=[
  ['outdoor','Picnic Meadow','🌿','soft grass, breeze & butterflies'],
  ['indoor','Cozy Room','🕯️','blankets, music & warm lights'],
  ['movies','Movie Night','🎬','popcorn, dim lights & your pick'],
  ['garden','Secret Garden','🌷','flowers, tiny paths & sunshine'],
  ['stargazing','Stargazing','🌙','blanket, constellations & quiet']
]

export default function Choose(){
 const r=useRouter()
 function pick(id){localStorage.setItem('date_place',id);r.push('/picks')}
 return <main className="page"><Nav/><section className="wide">
   <p className="eyebrow">step 1 of 3</p><h1 className="title">Where should we go?</h1>
   <div className="choiceGrid">
    {places.map(([id,name,emoji,desc])=><button key={id} onClick={()=>pick(id)} className="choiceCard paper">
      <div className="placeArt">{emoji}</div><h3>{name}</h3><p>{desc}</p><span>choose this place →</span>
    </button>)}
   </div>
 </section></main>
}
