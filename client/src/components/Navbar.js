import React from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Link } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";

function Navbar() {
  // const address = useSelector((state) => state.user.address);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const connectWallet = async () => {
    connect();
  };

  return (
    <div className="w-full flex flex-row justify-between px-2 py-2 md:px-8 lg:px-8 md:py-4 lg:py-4 bg-[#FFE7BF]">
       <Link to="/">
      <div className="flex flex-row w-48 items-center">
          <img
            className="w-8 h-8 md:mr-2 lg:mr-2"
            src="/images/daologo.webp"
            alt="dao logo"
          />
          <h2 className="hidden md:block lg:block md:text-2xl lg:text-2xl">
            Technology<span className="font-bold">DAO</span>
          </h2>
      </div>
      </Link>
      {isConnected ? (
        <button className="bg-[#A10035] text-white rounded-xl px-2 py-px md:px-4 lg:px-4 md:py-2 lg:py-2 text-sm md:text-base lg:text-base">
          Connected to {address.substring(0, 4)} ..
        </button>
      ) : (
        <button
          className="bg-[#A10035] text-white rounded-xl px-2 py-px md:px-4 lg:px-4 md:py-2 lg:py-2 text-sm md:text-base lg:text-base"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default Navbar;
