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
  }, [id, supabase, articles]); // Add 'articles' and 'supabase' to the dependency array

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
        <title>Blog&apos;AI- Article </title> {/* Escape single quote */}
        <link rel="icon" href="/icone manette.ico" />
      </Head>
      {/* ... (rest of the component remains unchanged) */}
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
