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
            <h2>The NFT contract is on Ham at [paste address].</h2>
            <h2>The ERC20 contract is on Base at [paste address].</h2>
          </div>
        </div>
      </div>
    </main>
  );
}
