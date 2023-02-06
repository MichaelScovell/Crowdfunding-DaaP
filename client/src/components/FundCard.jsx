import React from "react";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  // Calculating the deadline using the daysLeft util function
  const remainingDays = daysLeft(deadline);
  return (
    // Campaign Cards
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleClick}
    >
      {/*  Campaign Card Image */}
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />
      {/* Campaign Card */}
      <div className="flex flex-col p-4">
        {/* Category  */}
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            Project
          </p>
        </div>
        {/* Campaign Title and Description */}
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>
        {/* Campaign Deadline, Target and Amount Raised */}
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <h4 className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm: w-[120px] truncate">
              Raised of {target}
            </h4>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <h4 className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm: w-[120px] truncate">
              Days Left
            </h4>
          </div>
        </div>
        {/* Owner of the Campaign */}
        <div className="flex items-center mt-[20px] gap-[12px]">
          {/* Owner Image */}
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          {/* Owner Address */}
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            By: <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
