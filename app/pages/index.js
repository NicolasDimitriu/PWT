import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout.js';
import Image from 'next/image';

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

        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
      </Head>
      <div className={`flex flex-col items-center p-5 rounded-lg ${darkMode ? 'dark-mode' : 'light-mode'}`} style={{ fontFamily: 'Roboto' }}>
        <button onClick={toggleDarkMode} className="mb-4">
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>

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

      </div>
    </Layout>
  );
}
