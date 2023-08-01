import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async (context) => {

   async function getPost(id) {
    let setupUrl = `https://connect-dev.getfize.com/api/link/setup?setup_id=li_${id}&agent_information=false&client_information=false`
    const res = await fetch(setupUrl);
    let jsonResponse = await res.json();
    return jsonResponse;
  }

  let setupDetails = await getPost(context.query?.setupId || "demo")

  return {
    props: {
      image: setupDetails?.data?.link_information?.link_display_picture || "demo",
      title: setupDetails?.data?.link_information?.link_display_name || "",
      description: setupDetails?.data?.link_information?.link_display_description || "",
      setupId: context.query?.setupId || "demo"
    },
  };
};

const Home = props => {
  return (
    <>
      <Head>
        <title>Preview Link App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content={`${props?.title}`}
        />
        <meta
          property="og:description"
          content={`${props?.description}`}
        />
        <meta
          property="og:image"
          content={`${props?.image}`}
        />
        <meta property="twitter:image"  content={`${props?.setupId}`} />
        <meta
          property="twitter:description"
          content={`${props?.description}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>Find in-depth information about Next.js features and&nbsp;API.</p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>Discover and deploy boilerplate example Next.js&nbsp;projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>Instantly deploy your Next.js site to a shareable URL with&nbsp;Vercel.</p>
          </a>
        </div>
      </main>
    </>
  );
};

export default Home;
