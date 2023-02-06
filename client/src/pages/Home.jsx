// Home Page

// Defining libs
import React, { useState, useEffect } from "react";

// Defining context imports (StateContextProvider)
import { useStateContext } from "../context";

// Defining component imports
import { DisplayCampaigns } from "../components/DisplayCampaigns";

const Home = () => {
  // Defining our variables to hold state
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  // Defining variables to hold our StateContext
  const { address, contract, getCampaigns } = useStateContext();

  // Defining a function to fetch campaigns before our useEffect
  const fetchCampaigns = async () => {
    setIsLoading(true);
    // Store the fetched data from the getCampaigns function in a variable
    const data = await getCampaigns();
    // Update the campaigns state
    setCampaigns(data);
    // Set state of isLoading to false (as it is no longer loading campaigns)
    setIsLoading(false);
  };

  //
  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
