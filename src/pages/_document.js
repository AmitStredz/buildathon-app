import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Buildathon</title>
        <link rel="icon" href="/assets/logo4.png" />
        <link rel="apple-touch-icon" href="logo4.png" />
        <meta
          name="description"
          content="Brief description of your page content here"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Next.js, web development, portfolio" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
