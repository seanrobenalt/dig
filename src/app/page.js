import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 style={{ color: "#C9362B" }}>Dig</h1>
      </div>

      <div style={{ fontFamily: "LaBeouf" }}>
        <div style={{ margin: "10px" }}>
          <h2>coming soon.</h2>

          <Image
            src="/grail.png"
            alt="dig"
            width={250}
            height={250}
            style={{ margin: "10px" }}
          />
        </div>

        <hr />
      </div>
    </main>
  );
}
