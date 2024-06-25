import { createCanvas, loadImage } from "@napi-rs/canvas";
import path from "path";
import { uploadImageToImgur } from "../../utils/uploadImage";
import { getDigStatsByFid } from "../../utils/dig";
import { PinataFDK } from "pinata-fdk";

const fdk = new PinataFDK({
  pinata_jwt: process.env.PINATA_JWT,
  pinata_gateway: process.env.PINATA_GATEWAY,
});

export default async (req, res) => {
  if (req.method === "POST") {
    const { isValid, message } = await fdk.validateFrameMessage(req.body);

    if (!isValid) {
      return res.status(200).send(`
          <!DOCTYPE html>
            <html>
              <head>
                <meta property="fc:frame" content="vNext" />
                <meta property="fc:frame:image" content="https://www.dig.bingo/lbError.png" />
                <meta property="og:image" content="https://www.dig.bingo/lbError.png" />
                <meta property="fc:frame:button:1" content="Dig" />
                <meta property="fc:frame:button:1:action" content="post" />
                <meta
                  property="fc:frame:button:1:post_url"
                  content="https://www.dig.bingo/api/leaderDig"
                />
                <meta property="fc:frame:button:2" content="My Stats" />
                <meta property="fc:frame:button:2:action" content="post" />
                <meta
                  property="fc:frame:button:2:post_url"
                  content="https://www.dig.bingo/api/myStats"
                />
                <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
              </head>
            </html>
        `);
    }

    try {
      const { fid } = message.data;

      const imgPath = path.join(process.cwd(), "public", "lbStats.png");
      const img = await loadImage(imgPath);

      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);

      ctx.font = "64px Arial";

      const count = await getDigStatsByFid(fid);

      ctx.fillStyle = "#347d2e";
      const text = `${count.count} dig(s)`;
      ctx.fillText(text, 140, 330);

      const buffer = canvas.toBuffer("image/png");

      const imgurResponse = await uploadImageToImgur(buffer);

      return res.status(200).send(`
        <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${imgurResponse}" />
              <meta property="og:image" content="${imgurResponse}" />
              <meta property="fc:frame:button:1" content="Leaderboard" />
              <meta property="fc:frame:button:1:action" content="post" />
              <meta
                property="fc:frame:button:1:post_url"
                content="https://www.dig.bingo/api/leader"
              />
              <meta property="fc:frame:button:2" content="Dig" />
              <meta property="fc:frame:button:2:action" content="post" />
              <meta
                property="fc:frame:button:2:post_url"
                content="https://www.dig.bingo/api/leaderDig"
              />
              <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            </head>
          </html>
      `);
    } catch (error) {
      console.error(error);
      return res.status(200).send(`
        <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="https://www.dig.bingo/lbError.png" />
              <meta property="og:image" content="https://www.dig.bingo/lbError.png" />
              <meta property="fc:frame:button:1" content="Leaderboard" />
              <meta property="fc:frame:button:1:action" content="post" />
              <meta
                property="fc:frame:button:1:post_url"
                content="https://www.dig.bingo/api/leader"
              />
              <meta property="fc:frame:button:2" content="My Stats" />
              <meta property="fc:frame:button:2:action" content="post" />
              <meta
                property="fc:frame:button:2:post_url"
                content="https://www.dig.bingo/api/myStats"
              />
              <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            </head>
          </html>
      `);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
