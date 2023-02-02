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
        uint256 dontations;
    }

    // Mapping our Campgains struct to the public campgains variable to invoke it
    mapping(uint256 => Campaign) public campaigns;

    // Defining a global variable to track the number of campaigns
    uint256 public numberOfCampaigns = 0;

    // Defining a function for creating campaigns
    function createCampaign() {}

    // Defining a function for dontating to a campaign
    function donateToCampaign() {}

    // Define a function to retrieve a list of donators to a given campaign
    function getDontators() {}

    // Define a function to retrieve a list of campaigns
    function getCampaigns() {}
}