import React, { useEffect, useState } from 'react';

function DonationCampList() {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    // Fetch all donation camps
    // donationCampService.getAllCamps().then(setCamps);
  }, []);

  return (
    <div>
      <h1>Donation Camps</h1>
      <ul>
        {camps.map(camp => (
          <li key={camp.id}>{camp.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DonationCampList;
