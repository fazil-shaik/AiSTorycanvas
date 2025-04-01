import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { createThemeContext } from "./components/SceneTransition";

// Create ThemeContext once and apply it to the document
createThemeContext();

createRoot(document.getElementById("root")!).render(<App />);
