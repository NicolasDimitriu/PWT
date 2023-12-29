import { useContext } from 'react'
import UserContext from './UserContext'
import Link from 'next/link'
import Image from 'next/image'
import Login from './Login'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useDarkMode } from '../components/DarkModeContext';

  

export default function Header(){
  const {user, logout} = useContext(UserContext)
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  const { darkMode, toggleDarkMode } = useDarkMode();

  async function signOut(){
    if(user){
      await supabaseClient.auth.signOut()
      router.reload(window.location.pathname)
    }
    else
    router.push('/profile')
    
  }

  return (
    <header className="flex bg-blue-600 px-10 py-2">
      <Link href={`/`} className="flex-grow flex items-center">
        <Image src="/icone cerveaux.ico" className='cursor-pointer h-6 mr-5' alt="Adaltas Logo" width={30} height={60} />
        <span className="rounded py-1 px-2 hover:bg-slate-400 hover:text-slate-100 text-xl" >
          Blog'AI
        </span>
      </Link>
      <ul className="flex gap-5">
        <li className="rounded py-1 px-2 hover:bg-slate-400 hover:text-slate-900">
          <Link href="/articles/articles">
            Articles
          </Link>
        </li>
        <li className="rounded py-1 px-2 hover:bg-slate-400 hover:text-slate-900">
          <Link href="/about">
            About us
          </Link>
        </li>
        <li className="rounded py-1 px-2 hover:bg-slate-400 hover:text-slate-900">
          <Link href="/contact">
            Contact us
          </Link>
        </li>
        <li className="rounded py-1 px-2 text-slate-900 border bg-orange-200 border-slate-900 hover:bg-slate-400 hover:text-slate-900">
          <Login />
        </li>
        <li className="rounded py-1 px-2 text-slate-900 border bg-orange-200 border-slate-900 hover:bg-slate-400 hover:text-slate-900">
          <button onClick={signOut}>
            logout
          </button>
        </li>
      </ul>
    </header>
  )
}
