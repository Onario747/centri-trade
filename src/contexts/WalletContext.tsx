import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
  useConnection,
  useWallet as useSolanaWallet,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork, WalletName } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

// Import wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css";

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  balance: number;
  connectWallet: (type: "phantom" | "solflare") => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

// Inner provider that uses the Solana wallet adapter
const InnerWalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { connection } = useConnection();
  const wallet = useSolanaWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet.publicKey) {
        try {
          const balanceInLamports = await connection.getBalance(
            wallet.publicKey
          );
          setBalance(balanceInLamports / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Failed to fetch balance:", error);
          setBalance(0);
        }
      } else {
        setBalance(0);
      }
    };

    fetchBalance();
    // Set up an interval to refresh the balance
    const intervalId = setInterval(fetchBalance, 30000);

    return () => clearInterval(intervalId);
  }, [connection, wallet.publicKey]);

  const connectWallet = async (type: "phantom" | "solflare") => {
    try {
      const walletName = type === "phantom" ? "Phantom" : "Solflare";
      await wallet.select(walletName as WalletName);
      await wallet.connect();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = () => {
    wallet.disconnect();
  };

  return (
    <WalletContext.Provider
      value={{
        connected: wallet.connected,
        publicKey: wallet.publicKey?.toString() || null,
        balance,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Outer provider that sets up the Solana wallet adapter
export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Set up the network
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);

  // Set up the wallet adapters
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <InnerWalletProvider>{children}</InnerWalletProvider>
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};
