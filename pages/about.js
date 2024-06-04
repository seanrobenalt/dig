import Head from "next/head";

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

        <h3 style={{ fontFamily: "LaBeouf" }}>Coming Soon</h3>
      </main>
    </>
  );
}
