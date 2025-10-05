
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  createRoot(document.getElementById("root")!).render(<App />);
  
  import { SpeedInsights } from '@vercel/speed-insights/next';

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <head>
          <title>Next.js</title>
        </head>
        <body>
          {children}
          <SpeedInsights />
        </body>
      </html>
    );
  }