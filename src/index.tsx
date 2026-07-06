import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/MaterialTheme";
// Only the latin + latin-ext subsets are loaded (site is Uzbek/English);
// the default per-weight css also ships cyrillic + vietnamese, which go unused.
import "@fontsource/raleway/latin-300.css";
import "@fontsource/raleway/latin-ext-300.css";
import "@fontsource/raleway/latin-400.css";
import "@fontsource/raleway/latin-ext-400.css";
import "@fontsource/raleway/latin-500.css";
import "@fontsource/raleway/latin-ext-500.css";
import "@fontsource/raleway/latin-600.css";
import "@fontsource/raleway/latin-ext-600.css";
import "@fontsource/raleway/latin-700.css";
import "@fontsource/raleway/latin-ext-700.css";
import "@fontsource/playfair-display/latin-400.css";
import "@fontsource/playfair-display/latin-ext-400.css";
import "@fontsource/playfair-display/latin-500.css";
import "@fontsource/playfair-display/latin-ext-500.css";
import "@fontsource/playfair-display/latin-600.css";
import "@fontsource/playfair-display/latin-ext-600.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/playfair-display/latin-ext-700.css";
import "./css/index.css";
import { HashRouter } from "react-router-dom";
import ContextProvider from "./app/context/ContextProvider";
import ScrollToTop from "./app/components/headers/ScrollToTop";
import { SocketProvider } from "./app/context/SocketContext";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <SocketProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <HashRouter>
              <ScrollToTop />
              <App />
            </HashRouter>
          </ThemeProvider>
        </SocketProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);
