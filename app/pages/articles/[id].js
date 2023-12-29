import { useContext, useState, useEffect } from 'react';
import md from 'markdown-it';
import Head from 'next/head';
import Layout from '../../components/Layout.js';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import UserContext from '../../components/UserContext';
import { useRouter } from 'next/router';

export default function Article({
  id
}) {
  const router = useRouter();
  const [articles, setArticle] = useState(null);
  const [comments, setComment] = useState(null);
  const supabase = useSupabaseClient();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchArticle = async () => {
      let { data, error, status } = await supabase
        .from('articles')
        .select(`*, comments(*)`)
        .eq('id', id)
        .single();
      setArticle(data);
      console.log(data);
    };

    fetchArticle();
  }, [id, supabase]);

  let user_id = '';
  let author = '';
  let formerror = '';

  const DeleteArticle = async () => {
    const { data3, error3 } = await supabase
      .from('articles')
      .delete()
      .eq('id', articles.id);

    if (error3) {
      console.log(error3);
    }
  };

  const CreateComment = async function (e) {
    if (user) {
      user_id = user.id;
      author = user.user_metadata.preferred_username;
      e.preventDefault();
      const { data4, error4 } = await supabase
        .from('comments')
        .insert([{ title, message, user_id }]);
    }
    if (!user) {
      router.push('/login');
    }
  };

  const DeleteComment = async () => {
    const { data5, error5 } = await supabase
      .from('comments')
      .delete()
      .eq('id', articles.comments.id);

    if (error5) {
      console.log(error5);
    }
  };

return (
  <Layout>
    <Head>
      <title>Blog'AI- Article </title>
      <link rel="icon" href="/icone manette.ico" />
    </Head>
      {/*fetch the article chosen and his comments */}
      <h1 className='wt-title'>
        View an article 
      </h1>
      {articles && (
        <div className="overflow-hidden divide-y divide-slate-200 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg bg-white" >
          <div className="bg-slate-50">
            <dl className="grid grid-cols-[auto_1fr] px-3 py-4 [&_dt]:italic [&_dt]:text-slate-500 [&_dt]:pr-3">
              <dt>Title </dt>
              <dd>{articles.title}</dd>
              <dt>Genre</dt>
              <dd>{articles.genre}</dd>
            </dl>
          </div>
          <div className="px-3 py-10 bg-white">
          <div dangerouslySetInnerHTML={{ __html: md().render(articles.plot) }} />
          </div>
          <button onClick={DeleteArticle}>
            <Link href="/articles/articles">
              Delete Article
            </Link>
          </button>
          <h2 className=''>
            
              
            <tbody className="divide-y divide-slate-200 bg-white">

              {articles.comments.map((comment) => (
                <tr key={comment.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{comment.title}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{comment.message}</td>
                  <td>
                    <button  className='focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-slate-400 dark:focus:ring-slate-400 ' onClick={DeleteComment}>

                    <Link
                      
                      href={`/comments/${comment.id}`}
                    >
                      Edit

                    </Link>
                    </button>
                  </td>
                  <button  className='focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-slate-400 dark:focus:ring-slate-400 ' onClick={DeleteComment}>Delete Comment</button> 
                </tr>
              ))}
            </tbody>
             
          </h2>
        </div>

      )}
      
     
      
      {/*space to create a comment*/}
      <h3>
        <h1 className='wt-title py-6 bg-white'>
          Create a comment:
        </h1>
        <div className='bg-white'>
          <div className='create comment'>
            <form onSubmit={CreateComment}>
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
                <label>Message:</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div>
                <button className='focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-slate-400 dark:focus:ring-slate-400'>Create </button>
              </div>
              {formerror && <p>{formerror}</p>}
            </form>
          </div>
        </div>
        
      </h3>

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