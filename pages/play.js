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
        <meta property="fc:frame:button:2" content="NFT" />
        <meta property="fc:frame:button:2:action" content="link" />
        <meta
          property="fc:frame:button:2:target"
          content="https://explorer.ham.fun/token/0x142407b2D618f7DA94bE2194f426B532f3405949/"
        />
        <meta property="fc:frame:button:3" content="Tokens" />
        <meta property="fc:frame:button:3:action" content="link" />
        <meta
          property="fc:frame:button:3:target"
          content="https://basescan.org/address/0x156c132c93ce88bbab04313ef456f093d6957409"
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
