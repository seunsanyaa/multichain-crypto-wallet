# Multichain Wallet React Components

This package provides React components and hooks for integrating the Multichain Wallet library into your React applications.

## Installation

```bash
npm install @multichain-wallet/react
```

## Usage

### Basic Setup

Wrap your application with the `WalletProvider`:

```tsx
import { WalletProvider } from '@multichain-wallet/react';

const config = {
  supportedChains: [
    {
      id: 'ethereum',
      name: 'Ethereum',
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID',
      icon: 'https://example.com/ethereum-icon.png'
    },
    {
      id: 'solana',
      name: 'Solana',
      rpcUrl: 'https://api.mainnet-beta.solana.com',
      icon: 'https://example.com/solana-icon.png'
    }
  ],
  defaultChain: 'ethereum',
  modalOptions: {
    display: 'modal',
    position: 'center'
  }
};

function App() {
  return (
    <WalletProvider config={config}>
      <YourApp />
    </WalletProvider>
  );
}
```

### Using the Wallet Hook

Use the `useWallet` hook to access wallet functionality:

```tsx
import { useWallet } from '@multichain-wallet/react';

function ConnectButton() {
  const { isConnected, account, connect, disconnect, openModal } = useWallet();

  if (isConnected) {
    return (
      <div>
        <p>Connected: {account}</p>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  }

  return <button onClick={openModal}>Connect Wallet</button>;
}
```

### Features

- **Multi-chain Support**: Connect to multiple blockchain networks
- **Modal UI**: Built-in modal for wallet connection
- **State Management**: Automatic state management for wallet connection
- **Balance Tracking**: Automatic balance updates
- **Error Handling**: Built-in error handling and state management

### Configuration Options

The `WalletProvider` accepts a config object with the following options:

```typescript
interface WalletConfig {
  supportedChains: Chain[];
  defaultChain?: string;
  modalOptions?: {
    display: 'modal' | 'iframe' | 'popup';
    position?: 'center' | 'bottom';
  };
}
```

### Chain Configuration

Each chain in the `supportedChains` array should have:

```typescript
interface Chain {
  id: string;
  name: string;
  rpcUrl: string;
  icon?: string;
}
```

## API Reference

### useWallet Hook

The `useWallet` hook provides the following:

```typescript
interface WalletContextValue {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  balance: string | null;
  error: Error | null;
  connect: (chainId: string) => Promise<void>;
  disconnect: () => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
}
```

## Examples

### Basic Connection

```tsx
function ConnectWallet() {
  const { isConnected, account, openModal } = useWallet();

  return (
    <div>
      {isConnected ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={openModal}>Connect Wallet</button>
      )}
    </div>
  );
}
```

### Chain Selection

```tsx
function ChainSelector() {
  const { chainId, connect } = useWallet();

  return (
    <select
      value={chainId || ''}
      onChange={(e) => connect(e.target.value)}
    >
      <option value="ethereum">Ethereum</option>
      <option value="solana">Solana</option>
    </select>
  );
}
``` 