import { ThemeProvider } from "next-themes";
import "../styles/globals.scss";
import Layout from "../components/Layout";
import "../styles/utility.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
