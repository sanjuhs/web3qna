import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from 'ethers'

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </WagmiConfig>
  </React.StrictMode>
);
