import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Arrow Tips</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://brother.bet">Arrow Tips!</a>
        </h1>
      </main>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <footer className={styles.footer}>
        <a href="https://brother.bet" target="_blank" rel="noopener noreferrer">
          <span> Powered by</span>
          <span className={styles.backLogo}>
            <img src="/logo.png" alt="Vercel Logo" className={styles.logo} />
          </span>
          <span> Brother.Bet</span>
        </a>
      </footer>
    </div>
  );
}
