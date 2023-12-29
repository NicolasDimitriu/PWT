
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head.js'
import Layout from '../components/Layout.js'
import Link from 'next/link.js'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import UserContext from '../components/UserContext'

export default function Create () {
    const { user } = useContext(UserContext) // Utilisez useContext pour obtenir les informations de l'utilisateur
    const uuid = user ? user.id : null // Obtenez l'UUID de l'utilisateur

    const supabase = useSupabaseClient()
    const [title,setTitle] = useState('')
    const [plot,setPlot] = useState('')
    const [genre,setGenre] = useState('')
    const router = useRouter()

    const onSubmit = async function(e){
        e.preventDefault()
        const {data, error} = await supabase
        .from('articles') 
        .insert([{title, plot, genre, author_id: uuid}]) // Incluez l'UUID de l'utilisateur lors de l'insertion
        if (error) {
            console.error("Erreur lors de l'ajout de l'article :", error);
        } else {
            console.log("Article ajouté avec succès :", data);
            router.push('/articles/articles') // Redirige vers la page de la liste d'articles
        }
    }

    return (
        <Layout>
            <Head>
            <title>Blog'AI - create Article</title>
            </Head>
            <div className='create article'>
                <form onSubmit={onSubmit}>
                    <div className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 px-6 py-6'>
                        <label>Title :</label>
                        <input 
                        type="text"
                        id=" title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        />
                    </div>

                    <div className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 px-6 py-6'>
                        <label>Content:</label>
                        <textarea 
                        id="plot"
                        value={plot}
                        onChange={(e) => setPlot(e.target.value)}
                        required
                        />
                    </div>
                    
                    <div className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 px-6 py-6'>
                        <label>Genre:</label>
                        <input 
                        type="text"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        />
                    </div>
                    <div>
                        <button type="submit" className='focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-slate-400 dark:focus:ring-slate-400'>
                            Create Article
                        </button>
                    </div>
                </form>
                <div>
                    <ul>
                        <li>
                            <button className='focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-slate-400 dark:focus:ring-slate-400'>
                                <Link href="/articles/articles">
                                    Cancel
                                </Link>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>

    )
}
