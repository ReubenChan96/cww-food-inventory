import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { injectSpeedInsights } from '@vercel/speed-insights';

// Inject Speed Insights for web instead of React component
injectSpeedInsights();

createRoot(document.getElementById("root")!).render(<App />);