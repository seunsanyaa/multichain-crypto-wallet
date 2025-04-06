import { WalletProvider} from 'multichain-crypto-wallet/src/react/WalletProvider';
import {  useWallet } from 'multichain-crypto-wallet/src/react';


// Define supported chains
const config = {
  supportedChains: [
    {
      id: 'ethereum',
      name: 'Ethereum',
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
    },
    {
      id: 'solana',
      name: 'Solana',
      rpcUrl: 'https://api.mainnet-beta.solana.com',
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      rpcUrl: 'https://blockstream.info/api/',
    },
  ],
};

// Wallet UI Component
const WalletUI = () => {
  const { isConnected, account, chainId, balance, connect, disconnect, openModal } = useWallet();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Multi-Chain Wallet Demo</h1>
      
      {!isConnected ? (
        <button 
          onClick={openModal}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h2>Wallet Information</h2>
            <p>Chain: {chainId}</p>
            <p>Account: {account}</p>
            <p>Balance: {balance || 'Loading...'}</p>
          </div>
          
          <button 
            onClick={disconnect}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <WalletProvider config={config}>
      <WalletUI />
    </WalletProvider>
  );
};

export default App; 