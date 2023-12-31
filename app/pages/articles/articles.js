import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { ChevronRightIcon, CpuChipIcon } from '@heroicons/react/solid'
import Layout from '../../components/Layout.js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'


function SearchBar({ articles, supabase, setArticles }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function deleteArticle(articleId) {
    const { data, error } = await supabase.from('articles').delete().match({ id: articleId });

    if (!error) {
      setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId));
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredArticles.map((article) => (
        <tr key={article.id}>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{article.title}</td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{article.plot}</td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{article.genre}</td>
          <td>
            <Link
              href={`/articles/${article.id}`}
              className="w-5 h-5 block bg-slate-200 hover:bg-blue-500 hover:text-white rounded-full"
            >
              <ChevronRightIcon className="h-5 w-5 " aria-hidden="true" />
            </Link>
          </td>
          <td>
            <button className='focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-slate-400 dark:focus:ring-slate-400'>
              <Link href={`/articles/view/${article.id}`}>View</Link>
            </button>
          </td>
          <td>
            <button className='focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-slate-400 dark:focus:ring-slate-400'>
              <Link href={`/articles/update/${article.id}`}>Update</Link>
            </button>
          </td>
          <td>
            <button
              onClick={() => deleteArticle(article.id)}
              className='focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500'
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchArticles = async () => {
      let { data, error } = await supabase.from('articles').select(`id, title, plot, genre`);
      if (error) {
        console.log(error);
      } else {
        setArticles(data);
      }
    };

    fetchArticles();
  }, [supabase]); // Include supabase in the dependency array

  return (
    <Layout>
      <Head>
        <title>WebTech - Articles list</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='wt-title'>
        List of articles
      </h1>
      <h2>
        <ul className="flex gap-5">
          <li>
            <button className='focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-slate-400 dark:focus:ring-slate-400'>
              <Link href="/createArticle">Create your article here!</Link>
            </button>
          </li>
        </ul>
      </h2>
      <p>Use the slide bar at the bottom of the table to View/Update/Delete items 😊</p>

      <div className="not-prose -my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 bg-white" >
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-slate-300">
              <thead className="bg-white">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                    Plot
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
                    Genre
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <SearchBar articles={articles} supabase={supabase} setArticles={setArticles} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}