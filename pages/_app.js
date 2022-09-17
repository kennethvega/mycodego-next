import { ThemeProvider } from "next-themes";
import "../styles/globals.scss";
import "../styles/utility.scss";
import "../styles/TextEditor.scss";
import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default MyApp;
