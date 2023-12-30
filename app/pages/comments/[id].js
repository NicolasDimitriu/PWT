import { useState, useEffect } from 'react'
import md from 'markdown-it'
import Head from 'next/head'
import Layout from '../../components/Layout.js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import {useParams} from 'react-router-dom'
import Link from 'next/link'

export default function Comment({
    id
  }) {
    //const [article, setArticle] = useState(null)
    const supabase = useSupabaseClient()
    const [title,setTitle] = useState('')
    const [message,setMessage] = useState('')
   


    const onSubmit= async (e) => {
        e.preventDefault()
        const{data,error} = await supabase
        .from('comments')
        .update({title,message})
        .eq('id',id)
      
        if(error){
          console.log(error)
        }

    }

    useEffect(() => {
      (async () => {
        let { data, error, status } = await supabase
          .from('comments')
          .select(`title,message`)
          .eq('id', id)
          .single()
        //setArticle(data)
        if (data){
          setTitle(data.title)
          setMessage(data.message)
        }
      })()
    }, [id])

    

    return (
        
        <Layout>
            <Head>
                <title>WebTech</title>
                <meta name="description" content="Web technologies blogging application" />
                <link rel="icon" href="/icone manette.ico" />
            </Head>
            <div className='comment-update'>
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Title :</label>
                        <input
                            type="text"
                            id=" title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Content:</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <div>
                        <button className='focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-slate-400 dark:focus:ring-slate-400'>
                            <Link href="/articles/articles">
                                Update Comment
                            </Link>
                        </button>
                    </div>


                </form>

            </div>
        </Layout>
        

     )
    }

export async function getServerSideProps(context) {
    return {
      props: {
        id: context.params.id
      },
    }
}