import Head from 'next/head.js'
import Layout from '../components/Layout.js'

export default function About() {
  return (
    <Layout>
      <Head>
        <title>WebTech - about us</title>
        <meta name="description" content="WebTech about us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='wt-title'>
        About us
      </h1>
      <p>
        We are three student passionate by the IA. We are Xavier, Nicolas and Maxime !
      </p>
    </Layout>
  )
}
