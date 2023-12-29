import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../../../components/Layout.js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Article({ id }) {
    const supabase = useSupabaseClient()
    const [title,setTitle] = useState('')
    const [plot,setPlot] = useState('') 
    const [genre,setGenre] = useState('') 
    const [comments, setComments] = useState([]) // Ajout d'un état pour les commentaires
    const [newComment, setNewComment] = useState('') // État pour le nouveau commentaire
    const [email, setEmail] = useState('') // État pour l'e-mail

    useEffect(() => {
        (async () => {
            let { data, error, status } = await supabase
            .from('articles')
            .select(`title, plot, genre`) 
            .eq('id', id)
            .single()
            if (error) {
                console.error("Erreur lors de la récupération de l'article :", error);
            } else if (data){
                setTitle(data.title)
                setPlot(data.plot) 
                setGenre(data.genre) 
            }

            // Récupération des commentaires de l'article
            let { data: commentData, error: commentError, status: commentStatus } = await supabase
            .from('commentaire')
            .select(`content, mail`) 
            .eq('idArticles', id)
            if (commentError) {
                console.error("Erreur lors de la récupération des commentaires :", commentError);
            } else if (commentData){
                setComments(commentData)
            }
        })()
    }, [id])

    const handleCommentChange = event => {
        setNewComment(event.target.value);
    };

    const handleEmailChange = event => {
        setEmail(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        event.stopPropagation(); // Ajout de cette ligne
        const { data, error } = await supabase
            .from('commentaire')
            .insert([
                { content: newComment, mail: email, idArticles: id },
            ]);
        if (error) {
            console.error("Erreur lors de l'ajout du commentaire :", error);
        } else if (data) {
            setComments([...comments, data[0]]);
            setNewComment('');
            setEmail('');
        }
    };

    return (
        <Layout>
            <Head>
                <title>Blog'AI- Article Details</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className='wt-title'>
                Article Details:
            </h1>
            <div className='article'>
                <p><strong>Titre: </strong>{title}</p>
                <p><strong>Plot : </strong> {plot}</p>
                <p><strong>Genre: </strong> {genre}</p>
            </div>
            <h2 className='wt-title'>
                Commentaires:
            </h2>
            <div className='comments'>
                {comments.map((comment, index) => (
                    <div key={index}>
                        <p><strong>Email: </strong>{comment.mail}</p>
                        <p><strong>Commentaire : </strong> {comment.content}</p>
                    </div>
                ))}
            </div>
            <h2 className='wt-title'>
                Ajouter un commentaire:
            </h2>
            <form onSubmit={handleSubmit} className="comment-form">
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} required className="input-field" />
                </label>
                <label>
                    Commentaire:
                    <textarea value={newComment} onChange={handleCommentChange} required className="textarea-field" />
                </label>
                <button type="submit" className="submit-button">Ajouter</button>
            </form>
            <style jsx>{`
                .comment-form {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .input-field, .textarea-field {
                    margin: 10px 0;
                    padding: 10px;
                    width: 100%;
                }
                .submit-button {
                    margin: 10px 0;
                    padding: 10px;
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    cursor: pointer;
                }
                .submit-button:hover {
                    background-color: #0051bb;
                }
            `}</style>
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