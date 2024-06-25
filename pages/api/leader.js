import { createCanvas, loadImage } from "@napi-rs/canvas";
import path from "path";
import { uploadImageToImgur } from "../../utils/uploadImage";
import { getLeaders } from "../../utils/dig";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const imgPath = path.join(process.cwd(), "public", "lb.png");
      const img = await loadImage(imgPath);

      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);

      const fontSize = 32;
      ctx.font = `${fontSize}px Arial`;

      const leaders = await getLeaders();

      const headerHeight = 230;
      const startY = headerHeight + 50;

      leaders.forEach((leader, index) => {
        const textX = 110;
        const y = startY + index * (fontSize + 10);

        ctx.fillStyle = "black";
        ctx.fillText(`${index + 1}. ${leader[0]}`, textX, y);

        ctx.fillStyle = "#C9362B";
        ctx.fillText(`${leader[1]}`, 380, y);
      });

      const buffer = canvas.toBuffer("image/png");

      const base64Image = buffer.toString("base64");

      const imgurResponse = await uploadImageToImgur(base64Image);

      return res.status(200).send(`
        <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${imgurResponse}" />
              <meta property="og:image" content="${imgurResponse}" />
              <meta property="fc:frame:button:1" content="Share" />
              <meta property="fc:frame:button:1:action" content="link" />
              <meta
                property="fc:frame:button:1:target"
                content="https://warpcast.com/~/compose?text=I%27ve+got+the+Dig%2C+play+the+game+by+%40sean07.eth&embeds[]=https%3A%2F%2Fwww.dig.bingo%2Fleaderboard"
              />
              <meta property="fc:frame:button:2" content="NFT" />
              <meta property="fc:frame:button:2:action" content="link" />
              <meta
                property="fc:frame:button:2:target"
                content="https://explorer.ham.fun/token/0x142407b2D618f7DA94bE2194f426B532f3405949/instance/1"
              />
              <meta property="fc:frame:button:3" content="Tokens" />
              <meta property="fc:frame:button:3:action" content="link" />
              <meta
                property="fc:frame:button:3:target"
                content="https://basescan.org/address/0x156c132c93ce88bbab04313ef456f093d6957409"
              />
              <meta property="fc:frame:button:4" content="My Stats" />
              <meta property="fc:frame:button:4:action" content="post_url" />
              <meta
                property="fc:frame:button:4:target"
                content="https://www.dig.bingo/myStats"
              />
              <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            </head>
          </html>
      `);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate image" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
