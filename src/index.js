import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";

const chainId = ChainId.BinanceSmartChainMainnet;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
   <ThirdwebProvider
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
      activeChain={56}
      clientId="c253ee2f378ff7eade282c568778ff7c"
    >
     <App />
    </ThirdwebProvider>
  </Router>
);



reportWebVitals();
