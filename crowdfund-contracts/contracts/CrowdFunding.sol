// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    // Defining a struct for the campgains
    struct Campaign {
        // Define struct properties
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] dontations;
    }

    // Mapping our Campgains struct to the public campgains variable to invoke it
    mapping(uint256 => Campaign) public campaigns;

    // Defining a global variable to track the number of campaigns
    uint256 public numberOfCampaigns = 0;

    // Defining a function for creating campaigns
    function createCampaign(address _owner, string memory _title, string memory _description, 
    uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {

        // Defining a variable to store campaigns
        Campaign storage campaign = campaigns[numberOfCampaigns];

        // Check if the campgain's deadline is greater than the current date
        require(campaign.deadline < block.timestamp, "The deadline should be set to a date in the future.");

        // Populate the campaign with the details of the new campaign
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        // Increment the number of campagins 
        numberOfCampaigns++;

        // Return the index of the recently created campaign
        return numberOfCampaigns - 1;

    }

    // Defining a function for dontating to a campaign
    function donateToCampaign(uint256 _id) public payable {
        // Define a variable for storing the donation
        uint256 amount = msg.value;

        // Retrieve the campagin that the dontations is being made to through the id
        Campaign storage campaign = campaigns[_id];
        
        // Dontate (via pushing the address and then the amount)
        campaign.donators.push(msg.sender);
        campaign.dontations.push(amount);

        // Check whether the transcation has been sent
        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            // Update the collected amount for the campaign with the recently sent donation
            campaign.amountCollected = campaign.amountCollected + amount;
        }

    }

    // Define a function to retrieve a list of donators to a given campaign
    function getDontators() {}

    // Define a function to retrieve a list of campaigns
    function getCampaigns() {}
}