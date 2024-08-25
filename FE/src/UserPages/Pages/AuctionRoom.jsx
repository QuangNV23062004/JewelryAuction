import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const AuctionRoom = () => {
  const { roomId } = useParams();
  const [bidAmount, setBidAmount] = useState(0);
  const [currentBid, setCurrentBid] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    // Join the auction room when the socket connects or when roomId changes
    socket.emit("joinAuctionRoom", roomId);

    // Listen for new bids
    socket.on("newBid", (bid) => {
      setCurrentBid(bid);
    });

    // Cleanup: disconnect from the socket and leave the room when the component unmounts or roomId changes
    return () => {
      socket.emit("leaveAuctionRoom", roomId); // Optional: If you want to emit an event when leaving the room
      socket.disconnect();
    };
  }, [roomId]);

  const handlePlaceBid = () => {
    const socket = io("http://localhost:5000");
    if (socket) {
      // Emit a bid event with the bid amount and room ID
      socket.emit("placeBid", { roomId, bidAmount });
    }
  };

  return (
    <div>
      <h2>Auction Room: {roomId}</h2>
      <p>Current Bid: {currentBid ? `$${currentBid}` : "No bids yet"}</p>

      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(Number(e.target.value))}
      />
      <button onClick={handlePlaceBid}>Place Bid</button>
    </div>
  );
};

export default AuctionRoom;
