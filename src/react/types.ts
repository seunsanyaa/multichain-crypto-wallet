export interface WalletState {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  balance: string | null;
  error: Error | null;
}

export interface Chain {
  id: string;
  name: string;
  rpcUrl: string;
}

export interface WalletConfig {
  supportedChains: Chain[];
}

export interface WalletContextValue extends WalletState {
  connect: (chainId: string) => Promise<void>;
  disconnect: () => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
}

export interface WalletProviderProps {
  children: React.ReactNode;
  config: WalletConfig;
} 