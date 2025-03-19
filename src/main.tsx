import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ThemeProvider } from "./context/theme-context.tsx";
import { AllContextProvider } from "./context/AllContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <AuthProvider>
      <AllContextProvider>
      <App />
      </AllContextProvider>
    </AuthProvider>
   
    </ThemeProvider>
  </StrictMode>
);
