import { ThemeProvider } from "next-themes";
import "../styles/globals.scss";
import "../styles/utility.scss";
import "../styles/TextEditor.scss";
import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
