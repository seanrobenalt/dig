import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <meta property="fc:frame" content="vNext" />
        <meta
          property="fc:frame:image"
          content="https://dig-axx77enke-seanweb3s-projects.vercel.app/digNFT.png"
        />
        <meta
          property="og:image"
          content="https://dig-axx77enke-seanweb3s-projects.vercel.app/digNFT.png"
        />
        <meta property="fc:frame:button:1" content="Read More" />
        <meta
          property="fc:frame:post_url"
          content="https://dig-axx77enke-seanweb3s-projects.vercel.app/api/play"
        />
        <meta property="fc:frame:image:aspect_ratio" content="1:1" />
      </Head>
    </>
  );
}
