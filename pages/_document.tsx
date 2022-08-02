import Document, { Html, Main, Head, NextScript } from 'next/document'

const MyDocument = () => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300&display=swap" rel="stylesheet" />

        <meta name="theme-color" content="#d10a1b" />
        <meta name="msapplication-navbutton-color" content="#d10a1b" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument