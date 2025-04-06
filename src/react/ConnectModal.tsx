import React from 'react';
import { Chain } from '../services/wallet';

interface ConnectModalProps {
  chains: Chain[];
  onConnect: (chainId: string) => Promise<void>;
  onClose: () => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  chains,
  onConnect,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          {chains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => onConnect(chain.id)}
              className="w-full flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {chain.icon && (
                <img
                  src={chain.icon}
                  alt={chain.name}
                  className="w-8 h-8 mr-3"
                />
              )}
              <div className="text-left">
                <div className="font-medium">{chain.name}</div>
                <div className="text-sm text-gray-500">{chain.id}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 