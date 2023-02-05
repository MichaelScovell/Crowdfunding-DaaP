// Index Js page for Smart Contract Interactions (Web 3 Logic)

// Defining lib imports
import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

// Define variables for tracking context
const StateContext = createContext();

// Define a function for creating our context provider
export const StateContextProvider = ({ children }) => {
  // Defining our contract address to be used for contract interactions
  const { contract } = useContract(
    "0x8d7BdEFbf08415Ca071983b3702a9DFa072A9db8"
  );
  // Building our function call to the smart contract through the useContractWrite function
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  // Defining a variable to house our wallet address
  const address = useAddress();
  const connect = useMetamask();

  // Defining a function to create the campaign from the form data
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image,
      ]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Exporting our context so that it can be wrapped around our entire app
export const useStateContext = () => useContext(StateContext);
