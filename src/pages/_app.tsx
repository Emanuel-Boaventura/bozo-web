import { GameProvider } from "@/context/gameContext";
import { PlayersProvider } from "@/context/playersContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlayersProvider>
      <GameProvider>
        <Head>
          <title>Bozó Web | Marcador de Pontos Online</title>

          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />

          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

          <meta property="og:image" content="/shared-image.png" />
          <meta property="og:image:height" content="400" />
          <meta property="og:image:width" content="400" />

          <meta
            property="og:title"
            content="Bozó Web | Marcador de Pontos Online"
            key="ogtitle"
          />

          <meta
            property="og:description"
            content="Precisa marcar os pontos da partida de bozó, mas não quer usar papel e caneta? Não se preocupe, o bozó web está aqui justamente para te ajudar!"
            key="ogdesc"
          />

          <meta name="author" content="Emanuel Boaventura Matos" key="author" />
        </Head>
        <Component {...pageProps} />
      </GameProvider>
    </PlayersProvider>
  );
}
