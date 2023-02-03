// Utility functions for the application

// Function for calculating the number of days till the deadline of the specified campaign
export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
  
    return remainingDays.toFixed(0);
  };
  
  // Function for calculating the bar percentage for a campaign (donation goals)
  export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);
  
    return percentage;
  };
  
  // Function to check is working
  export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };