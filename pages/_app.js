import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Component key={router.asPath} {...pageProps} />
      </AnimatePresence>
    </Layout>
  );
}
