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
        <meta property="fc:frame:button:1:action" content="post" />
        <meta
          property="fc:frame:button:1:post_url"
          content="https://dig-git-sean-featuregame-seanweb3s-projects.vercel.app/api/play"
        />
        <meta property="fc:frame:button:2" content="View on Ham" />
        <meta property="fc:frame:button:2:action" content="link" />
        <meta
          property="fc:frame:button:2:target"
          content="https://explorer.ham.fun"
        />
        <meta property="fc:frame:button:3" content="Token Balances" />
        <meta property="fc:frame:button:3:action" content="link" />
        <meta
          property="fc:frame:button:3:target"
          content="https://basescan.org"
        />
        <meta property="fc:frame:button:4" content="Rules" />
        <meta property="fc:frame:button:4:action" content="link" />
        <meta
          property="fc:frame:button:4:target"
          content="https://dig-git-sean-featuregame-seanweb3s-projects.vercel.app/rules"
        />
        <meta property="fc:frame:image:aspect_ratio" content="1:1" />
      </Head>
    </>
  );
}
