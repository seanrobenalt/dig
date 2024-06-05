import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 style={{ color: "#C9362B", fontFamily: "SF Fedora" }}>Dig</h1>
      </div>

      <div style={{ fontFamily: "LaBeouf" }}>
        <div style={{ margin: "10px" }}>
          <Image
            src="/grail.png"
            alt="dig"
            width={250}
            height={250}
            style={{ margin: "10px" }}
          />

          <h2 style={{ margin: "5px" }}>
            The{" "}
            <span style={{ color: "#C9362B", fontFamily: "SF Fedora" }}>
              dig
            </span>{" "}
            NFT is an NFT on the Degen chain.
          </h2>
          <h2 style={{ margin: "5px" }}>
            Seize it by clicking the frame on any FC client (coming soon).
          </h2>
          <h2 style={{ margin: "5px" }}>
            There will also be a contract deployed to Base, that stores ERC20s.
          </h2>
          <h2 style={{ margin: "5px" }}>
            At a random time each week, this contract will transfer 1k of a
            random ERC20 in the contract to whoever is the{" "}
            <span style={{ color: "#C9362B", fontFamily: "SF Fedora" }}>
              dig
            </span>{" "}
            NFT holder. Check back to this page once the game is live to see the
            current balance of ERC20s in the contract.
          </h2>
        </div>
      </div>
    </main>
  );
}
