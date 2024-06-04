export default async function handler(req, res) {
  if (req.method === "POST") {
    res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://www.dig.bingo/hiw6.png" />
            <meta property="fc:frame:image:aspect_ratio" content=" 1.91:1" />
          </head>
        </html>
      `);
  } else {
    // Handle non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
