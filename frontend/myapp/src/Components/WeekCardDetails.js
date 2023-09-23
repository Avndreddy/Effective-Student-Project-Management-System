// WeekCardDetails.js

import React from 'react';

const WeekCardDetails = ({ weekData }) => {
  if (!weekData) {
    return <div>Week data not found</div>;
  }

  return (
    <div>
      <h2>Week Details</h2>
      <p>Title: {weekData.title}</p>
      <p>Description: {weekData.description}</p>
      {/* Render other properties of weekData as needed */}
    </div>
  );
};

export default WeekCardDetails;
