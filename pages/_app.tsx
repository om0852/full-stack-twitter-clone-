import "@/styles/globals.css";
import LoginModal from "./component/modals/LoginModal";
import RegisterModal from "./component/modals/RegisterModal";
import {Toaster} from "react-hot-toast";

import type { AppProps } from "next/app";
import Layout from "./component/Layout";
import { SessionProvider } from "next-auth/react";
import EditModal from "./component/modals/EditModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <SessionProvider session={pageProps.session}>
        <Toaster/>
        <LoginModal/>
        <EditModal/>
        <RegisterModal/>
    <Layout>
  <Component {...pageProps} />;
    </Layout>
  </SessionProvider>
  )
}
