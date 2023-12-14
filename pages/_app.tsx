import { AppProps } from "next/app";
import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "@/app/store";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
