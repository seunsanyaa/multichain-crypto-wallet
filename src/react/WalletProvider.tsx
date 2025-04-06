import * as React from 'react';
import { Network } from '../common/utils/types';
import * as walletService from '../services/wallet';
import { ConnectModal } from './ConnectModal';
import type { WalletState, WalletConfig, WalletContextValue, WalletProviderProps, Chain } from './types';

// Create context with type
const WalletContext = React.createContext<WalletContextValue | null>(null);

export const WalletProvider: React.FC<WalletProviderProps> = ({ children, config }) => {
  const [state, setState] = React.useState<WalletState>({
    isConnected: false,
    account: null,
    chainId: null,
    balance: null,
    error: null,
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const connect = React.useCallback(async (chainId: string) => {
    try {
      const chain = config.supportedChains.find((c: Chain) => c.id === chainId);
      if (!chain) {
        throw new Error(`Chain ${chainId} is not supported`);
      }

      // Here we would implement the actual wallet connection logic
      // For now, we'll just simulate a connection
      setState((prev: WalletState) => ({
        ...prev,
        isConnected: true,
        chainId,
        account: '0x123...abc', // This would be the actual wallet address
        error: null,
      }));
    } catch (error) {
      setState((prev: WalletState) => ({
        ...prev,
        error: error as Error,
      }));
    }
  }, [config.supportedChains]);

  const disconnect = React.useCallback(async () => {
    setState({
      isConnected: false,
      account: null,
      chainId: null,
      balance: null,
      error: null,
    });
  }, []);

  const openModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Fetch balance when account or chainId changes
  React.useEffect(() => {
    const fetchBalance = async () => {
      if (state.isConnected && state.account && state.chainId) {
        try {
          const balance = await walletService.getBalance({
            network: state.chainId as Network,
            address: state.account,
          });
          setState((prev: WalletState) => ({
            ...prev,
            balance: balance.toString(),
          }));
        } catch (error) {
          setState((prev: WalletState) => ({
            ...prev,
            error: error as Error,
          }));
        }
      }
    };

    fetchBalance();
  }, [state.isConnected, state.account, state.chainId]);

  const value: WalletContextValue = {
    ...state,
    connect,
    disconnect,
    openModal,
    closeModal,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
      {isModalOpen && (
        <ConnectModal
          chains={config.supportedChains}
          onConnect={connect}
          onClose={closeModal}
        />
      )}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextValue => {
  const context = React.useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 