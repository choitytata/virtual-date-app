'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '../../components/Nav'
import { getSupabase } from '../../lib/supabase'

export default function Login(){
 const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[msg,setMsg]=useState(''); const r=useRouter()
 async function act(mode){
   const s=getSupabase(); setMsg('')
   const fn=mode==='login'?s.auth.signInWithPassword({email,password}):s.auth.signUp({email,password})
   const {error}=await fn
   if(error)return setMsg(error.message)
   setMsg(mode==='login'?'Welcome back ♡':'Account created — check your email if confirmation is enabled.')
   if(mode==='login')setTimeout(()=>r.push('/photos'),500)
 }
 return <main className="page"><Nav/><section className="authCard paper"><p className="eyebrow">keep our memories safe</p><h1>Login</h1><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" type="email"/><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password"/>
 <div className="authButtons"><button className="primary" onClick={()=>act('login')}>Login</button><button className="secondary" onClick={()=>act('signup')}>Create account</button></div>{msg&&<p className="message">{msg}</p>}
 <small>Without login, this demo still keeps the latest date/selfie in this browser using localStorage.</small></section></main>
}
