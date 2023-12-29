import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout.js';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

export default function Article({ id }) {
    const supabase = useSupabaseClient();
    const [title, setTitle] = useState('');
    const [plot, setPlot] = useState('');
    const [genre, setGenre] = useState('');
    const router = useRouter();

    const onSubmit = async function (e) {
        e.preventDefault();
        const { data, error } = await supabase
            .from('articles')
            .update({ title, plot, genre }) // Utilisez 'update' au lieu de 'insert'
            .eq('id', id); // Spécifiez l'ID de l'article à mettre à jour
        if (error) {
            console.error("Erreur lors de la mise à jour de l'article :", error);
        } else {
            console.log("Article mis à jour avec succès :", data);
            router.push('/articles/articles'); // Redirige vers la page de la liste d'articles
        }
    };

    useEffect(() => {
        (async () => {
            let { data, error, status } = await supabase
                .from('articles')
                .select(`title, plot, genre`)
                .eq('id', id)
                .single();
            if (data) {
                setTitle(data.title);
                setPlot(data.plot);
                setGenre(data.genre);
            }
        })();
    }, [id, supabase]); // Add 'supabase' to the dependency array

    return (
        <Layout>
            <Head>
                <title>Blog&apos;AI- Create Article </title> {/* Escape single quote */}
                <link rel="icon" href="/icone manette.ico" />
            </Head>
            <h1 className='wt-title'>
                Update:
            </h1>
            <div className='article update'>
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
                        <label>Plot:</label>
                        <textarea
                            id="plot"
                            value={plot}
                            onChange={(e) => setPlot(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Genre:</label>
                        <input
                            type="text"
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>

                    <div>
                        <button type="submit" className='focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-slate-400 dark:focus:ring-slate-400'>
                            Update Article
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    return {
        props: {
            id: context.params.id
        },
    };
}
