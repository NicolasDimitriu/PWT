import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout.js';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  return (
    <Layout darkMode={darkMode}>
      <Head>
        <title>WebTech</title>
        <meta name="description" content="Web technologies blogging application" />
        <link rel="icon" href="/icone cerveaux.ico" />
        {/* Move the font link to the head of the document */}
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
      </Head>
      <div className={`flex flex-col items-center p-5 rounded-lg ${darkMode ? 'dark-mode' : 'light-mode'}`} style={{ fontFamily: 'Roboto' }}>
        <button onClick={toggleDarkMode} className="mb-4">
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        <h1 className="text-4xl font-bold text-center my-8 text-white">
          Welcome to Blog'AI
        </h1>
        <ul className="flex justify-around list-none p-0 mb-8 space-x-8">
          <li>
            <Link href="/articles">
              <span className="text-white text-2xl font-bold">A little article?</span>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <span className="text-white text-2xl font-bold">About us</span>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <span className="text-white text-2xl font-bold">Contact us</span>
            </Link>
          </li>
        </ul>
        <div className="flex justify-around py-12 bg-white rounded-lg space-x-8 mx-4">
          <img src="image/IA.jpeg" alt="IA" className="w-1/2 h-auto rounded-lg mx-2" />
          <img src="image/IA2.jpeg" alt="IA2" className="w-1/2 h-auto rounded-lg mx-2" />
        </div>
      </div>
    </Layout>
  );
}
