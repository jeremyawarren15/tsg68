import { Html, Main, Head, NextScript } from 'next/document'
import Script from 'next/script';

const MyDocument = () => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel='manifest' href='/manifest.json' />
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

      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" />
    </Html>
  )
}

export default MyDocument