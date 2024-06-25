import { createCanvas, loadImage } from "@napi-rs/canvas";
import path from "path";
import { uploadImageToImgur } from "../../utils/uploadImage";
import { getLeaders } from "../../utils/dig";
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

      const imgPath = path.join(process.cwd(), "public", "lb.png");
      const img = await loadImage(imgPath);

      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);

      ctx.font = "32px Arial";

      const leaders = await getLeaders();

      const headerHeight = 230;
      const startY = headerHeight + 50;

      leaders.forEach((leader, index) => {
        const textX = 110;
        const y = startY + index * (32 + 10);

        ctx.fillStyle = fid.toString() === leader[0] ? "#347d2e" : "#000000";
        const text = `${index + 1}. ${leader[0]}`;
        ctx.fillText(text, textX, y);

        ctx.fillStyle = "#347d2e";
        const cnt = `${leader[1]}`;
        ctx.fillText(cnt, 380, y);
      });

      const buffer = canvas.toBuffer("image/png");

      const imgurResponse = await uploadImageToImgur(buffer);

      return res.status(200).send(`
        <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${imgurResponse}" />
              <meta property="og:image" content="${imgurResponse}" />
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
    } catch (error) {
      console.error(error);
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
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
