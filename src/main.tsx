import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import { ErrorFallback } from "./ErrorFallback.tsx";

import "./main.css";
import "./styles/theme.css";
import "./index.css";

// Initialize dark mode before rendering
const initializeDarkMode = () => {
    const stored = localStorage.getItem("dark-mode");
    const isDarkMode = stored !== null ? JSON.parse(stored) : true; // Default to dark mode
    const html = document.documentElement;
    if (isDarkMode) {
        html.setAttribute("data-appearance", "dark");
        html.classList.add("dark");
    } else {
        html.removeAttribute("data-appearance");
        html.classList.remove("dark");
    }
};

initializeDarkMode();

createRoot(document.getElementById("root")!).render(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppProvider>
            <App />
        </AppProvider>
    </ErrorBoundary>
);
