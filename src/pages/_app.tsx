import { config } from "@/common/configs/wagmi";
import PageLayout from "@/common/layout/LayoutPage";
import '@/styles/antd.css';
import '@/styles/globals.css';
import '@/styles/notification.css';``
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";
import '@rainbow-me/rainbowkit/styles.css';
import { NotificationProvider } from "@/common/contexts/notification.context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 60 * 1000,
      refetchOnMount: "always",
    },
    mutations: {
      onError: (error) => {
        // const message = getErrorMessage(error);
        // handleShowError(message);
      },
    },
  },
});``
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={"en"}>
          <NotificationProvider>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
          </NotificationProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
