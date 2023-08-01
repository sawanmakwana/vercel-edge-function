import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'


export default function App() {

  const routes = useRouter();
  const setup_id = routes.asPath.replace("/","");
  console.log("setup_id", setup_id)
  return <>Link Landing Page<Head>
  <meta property="og:image"
    content={`https://vercel-edge-function-eight.vercel.app/api/og?id=${setup_id}`}
  />
</Head></>
}
