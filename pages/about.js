import Head from "next/head";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://www.dig.bingo/hiw1.png"
        />
        <meta property="og:image" content="https://www.dig.bingo/hiw1.png" />
        <meta property="fc:frame:button:1" content="Read More" />
        <meta
          property="fc:frame:post_url"
          content="https://www.dig.bingo/api/hiw/read"
        />
        <meta property="fc:frame:image:aspect_ratio" content=" 1.91:1" />
      </Head>
      <main
        style={{
          alignItems: "center",
          padding: "6rem",
          minHeight: "100vh",
        }}
      >
        <div>
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
              There will also be a contract deployed to Base, that stores
              ERC20s.
            </h2>
            <h2 style={{ margin: "5px" }}>
              At a random time each week, this contract will transfer 1k of a
              random ERC20 in the contract to whoever is the{" "}
              <span style={{ color: "#C9362B", fontFamily: "SF Fedora" }}>
                dig
              </span>{" "}
              NFT holder. Check back to this page once the game is live to see
              the current balance of ERC20s in the contract.
            </h2>
          </div>
        </div>
      </main>
    </>
  );
}
