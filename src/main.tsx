import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyleProvider } from "@ant-design/cssinjs";
import "@ant-design/v5-patch-for-react-19";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import { ConfigProvider } from "antd";
import AOS from "aos";
import "./api/client.ts";

import "./index.css";
import "aos/dist/aos.css";
import { BrowserRouter } from "react-router";

AOS.init({
  duration: 800,
  once: true,
  offset: 0,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyleProvider layer>
      <ConfigProvider
        componentSize="large"
        theme={{
          token: {
            colorBgLayout: "#FFFFFF",
            colorPrimary: "#4152B7",
          },
          components: {
            Modal: {
              borderRadiusLG: 30,
            },
          },
        }}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
);
