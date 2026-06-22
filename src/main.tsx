// MODIFIED: Wrapped App with HelmetProvider at the React root level
// This enables react-helmet-async to manage <head> tags from any component in the tree.
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
