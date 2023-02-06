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

  // Defining a function to get all the campaigns published to the blockchain from the contract
  const getCampaigns = async () => {
    // Defining a variable to store the results of the getCampaigns smart contract function
    const campaigns = await contract.call("getCampaigns");

    // Formatting the returned fetched data into a readable format
    const parsedCampaigns = campaigns.map((campaign, i) => ({
      // Format of the parsed data
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));
    // Return the parsedCampaign Data
    return parsedCampaigns;
  };

  // Defining a function to fetch the logged in users created campaigns
  const getUserCampaigns = async () => {
    // Fetch all campaigns from the getCampaigns function
    const allCampaigns = await getCampaigns();
    // Filter the campaigns to only return campaigns created by the user (connected metamask account)
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    // Return
    return filteredCampaigns;
  };

  // Define a function for donating to a campaign
  const donate = async (pId, amount) => {
    // Calling the donateToCampaign function from our smart contract and store it in a variable
    const data = await contract.call("donateToCampaign", pId, {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  // Define a function to fetch all donations for a campaign
  const getDonations = async (pId) => {
    // Calling the getDonators function from our smart contract and store it in a variable
    const donations = await contract.call("getDontators", pId);
    // Define a variable for the returned array of donations for a campaign
    const numberOfDonations = donations[0].length;
    // Define a variable for storing the parsed donation data
    const parsedDonations = [];

    // Define a loop that will iterate over the number of donations and populate the parsedDonations array with parsed donation data for a particular campaign
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Exporting our context so that it can be wrapped around our entire app
export const useStateContext = () => useContext(StateContext);
