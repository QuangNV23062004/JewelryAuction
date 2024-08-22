import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Auction() {
  const [auctions, setAuctions] = useState([]);
  const fetchData = async () => {
    try {
      const auctionsResponse = await axios.get(
        "http://localhost:5000/jewelry/with-auction"
      );
      setAuctions(
        auctionsResponse.data.sort((a, b) => new Date(a) - new Date(b))
      );
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {auctions &&
        auctions.map((au) => (
          <div style={{ margin: 20 }}>
            {au.name}
            <br />
            Start at: {au.auctionStatus.startTime}
            <br />
            End at: {au.auctionStatus.endTime}
          </div>
        ))}
    </>
  );
}
