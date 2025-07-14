"use client";
import { ReactNode, useState } from "react";
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig, createConfig, http } from 'wagmi';
import type { Chain } from 'viem/chains';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const pepuChain: Chain = {
  id: 97741,
  name: 'Pepe Unchained V2',
  nativeCurrency: {
    name: 'Pepe Unchained V2',
    symbol: 'PEPU',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc-pepu-v2-mainnet-0.t.conduit.xyz'] },
    public: { http: ['https://rpc-pepu-v2-mainnet-0.t.conduit.xyz'] },
  },
  blockExplorers: {
    default: { name: 'PepuScan', url: 'https://pepuscan.com/' },
  },
  testnet: false,
};

const chains = [pepuChain] as const;

const { connectors } = getDefaultWallets({
  appName: 'Pepu Bank',
  projectId: 'pepu-bank',
});

const wagmiConfig = createConfig({
  chains,
  connectors,
  transports: {
    [pepuChain.id]: http('https://rpc-pepu-v2-mainnet-0.t.conduit.xyz'),
  },
});

const customTheme = darkTheme({
  accentColor: '#fde047', // Tailwind yellow-300
  accentColorForeground: '#181b1c',
  borderRadius: 'none',
  overlayBlur: 'small',
});

export default function WalletProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider theme={customTheme}>
          <style>{`
            .rk-connect-button, .rk-connect-button__connected {
              min-width: 70px !important;
              height: 28px !important;
              padding: 0 10px !important;
              background: #ffe600 !important;
              color: #181b1c !important;
              border-radius: 0 !important;
              font-size: 13px !important;
              font-weight: bold !important;
              box-shadow: none !important;
              border: 2px solid #ffd600 !important;
              letter-spacing: 0.5px;
            }
            .rk-connect-button span, .rk-connect-button__connected span {
              font-size: 13px !important;
              font-weight: bold !important;
              color: #181b1c !important;
            }
          `}</style>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
} 