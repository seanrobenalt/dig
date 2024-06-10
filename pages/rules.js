import Image from "next/image";

export default function About() {
  return (
    <main
      style={{
        alignItems: "center",
        padding: "1rem",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div>
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
              <span
                style={{
                  color: "#C9362B",
                  fontFamily: "SF Fedora",
                  margin: "0px 10px",
                }}
              >
                dig
              </span>{" "}
              a maximum of once per hour.
            </h2>
            <h2 style={{ margin: "10px" }}>
              Every Monday, the ERC20 contract on Base will transfer 1k of a
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
              NFT holder.
            </h2>
            <h2>
              The NFT contract is on Ham at{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://explorer.ham.fun/address/0x142407b2D618f7DA94bE2194f426B532f3405949"
              >
                0x142407b2D618f7DA94bE2194f426B532f3405949
              </a>
              .
            </h2>
            <h2>
              The ERC20 contract is on Base at{" "}
              <a
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
