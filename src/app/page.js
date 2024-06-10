import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 style={{ color: "#C9362B", fontFamily: "SF Fedora" }}>Dig</h1>
      </div>

      <div style={{ fontFamily: "Livvic" }}>
        <div style={{ margin: "10px" }}>
          <Image
            src="/grail.png"
            alt="dig"
            width={250}
            height={250}
            style={{ margin: "10px" }}
          />

          <div style={{ margin: "10px", maxWidth: "600px" }}>
            <h2 style={{ margin: "10px" }}>
              The
              <span
                style={{
                  color: "#C9362B",
                  fontFamily: "SF Fedora",
                  margin: "0px 10px",
                }}
              >
                dig
              </span>
              NFT is on the Ham blockchain. Contract:{" "}
              <a
                style={{ color: "#C9362B" }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://explorer.ham.fun/address/0x142407b2D618f7DA94bE2194f426B532f3405949"
              >
                0x142407b2D618f7DA94bE2194f426B532f3405949
              </a>
              .
            </h2>
            <h2 style={{ margin: "10px" }}>
              Seize it by clicking the frame on any Farcaster client (coming
              soon). There is only one{" "}
              <span
                style={{
                  color: "#C9362B",
                  fontFamily: "SF Fedora",
                  margin: "0px 10px",
                }}
              >
                dig
              </span>{" "}
              NFT. Transfers are disabled except by the contract, so the only
              way to get it is to{" "}
              <span
                style={{
                  color: "#C9362B",
                  fontFamily: "SF Fedora",
                  margin: "0px 10px",
                }}
              >
                dig
              </span>{" "}
              it.
            </h2>
            <h2 style={{ margin: "10px" }}>
              There is also a contract deployed to Base, that stores ERC20s.
            </h2>
            <h2 style={{ margin: "10px" }}>
              At a random time each week, this contract will transfer 1k of a
              random ERC20 in the contract to whoever is the
              <span
                style={{
                  color: "#C9362B",
                  fontFamily: "SF Fedora",
                  margin: "0px 10px",
                }}
              >
                dig
              </span>
              NFT holder. Contract for the ERC20s:{" "}
              <a
                style={{ color: "#C9362B" }}
                href="https://basescan.org/address/0x156c132c93ce88bbab04313ef456f093d6957409"
                target="_blank"
                rel="noopener noreferrer"
              >
                0x156c132C93ce88bbaB04313ef456F093d6957409
              </a>
              .
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}
