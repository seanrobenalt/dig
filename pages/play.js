import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://dig-git-sean-featuregame-seanweb3s-projects.vercel.app/digNFT.png"
        />
        <meta
          property="og:image"
          content="https://dig-git-sean-featuregame-seanweb3s-projects.vercel.app/digNFT.png"
        />
        <meta property="fc:frame:button:1" content="Dig" />
        <meta
          property="fc:frame:post_url"
          content="https://dig-git-sean-featuregame-seanweb3s-projects.vercel.app/api/play"
        />
        <meta property="fc:frame:image:aspect_ratio" content="1:1" />
      </Head>
    </>
  );
}
