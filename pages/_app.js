import "../src/app/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <html lang="en">
      <body style={{ background: "#EEEEE4" }}>
        <Component {...pageProps} />
      </body>
    </html>
  );
}

export default MyApp;
