import { PlayersProvider } from "@/context/playersContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlayersProvider>
      <Component {...pageProps} />
    </PlayersProvider>
  );
}
