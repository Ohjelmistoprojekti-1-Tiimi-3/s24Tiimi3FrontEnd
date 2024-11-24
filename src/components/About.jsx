import React from 'react';

const About = () => {
  const storeInfo = {
    name: "Omppu & Rane Koiratarvikkeet",
    owners: ["Omppu", "Rane"],
    establishedYear: 2024,
    businessId: "1234567-8",
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1>{storeInfo.name}</h1>
      <p><strong>Perustettu:</strong> {storeInfo.establishedYear}</p>
      <p><strong>Y-tunnus:</strong> {storeInfo.businessId}</p>
      <h3>Omistajat:</h3>
      <ul>
        {storeInfo.owners.map((owner, index) => (
          <li key={index}>{owner}</li>
        ))}
      </ul>
    </div>
  );
};

export default About;
