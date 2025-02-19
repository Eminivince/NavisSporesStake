import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  bitgetWallet,
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, CreateConfigParameters, http } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { ENV, envNane } from ".";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        rainbowWallet,
        walletConnectWallet,
        bitgetWallet,
        injectedWallet,
      ],
    },
  ],
  {
    appName: "NAVIX Staking",
    projectId: "c9ce17ad7531e60b4eed5232dc01958d",
  }
);

const testnetConf: CreateConfigParameters = {
  connectors,
  chains: [bscTestnet, bsc],
  transports: {
    [bscTestnet.id]: http(),
    [bsc.id]: http(),
  },
};

const mainnetConf: CreateConfigParameters = {
  connectors,
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
};
const isProd = process.env.CURRENT_NETWORK === "PROD";

export const config = createConfig(isProd ? mainnetConf : testnetConf);
