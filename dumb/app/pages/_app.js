import '../styles/globals.css'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import {UserContextProvider} from '../components/UserContext'
import { DarkModeProvider } from '../components/DarkModeContext';

export default function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <UserContextProvider>
        <DarkModeProvider>
          <Component {...pageProps} />
        </DarkModeProvider>
      </UserContextProvider>
    </SessionContextProvider>
  )
}

