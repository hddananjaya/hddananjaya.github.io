import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/imgs/pyramid.png" />
        <meta name="description" content="Techie at Heart, Software Engineer by Day" />
        <meta name="keywords" content="portfolio, web development, design, projects, skills, akila dananjaya, hddananjaya, hd dananjaya" />
        <meta name="author" content="Akila Dananjaya" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <style>
          @import
          url(&apos;https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap&apos;);
        </style>
      </Head>
      <body
        className="antialiased h-screen"
        style={{
          backgroundImage: "url('/imgs/1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}