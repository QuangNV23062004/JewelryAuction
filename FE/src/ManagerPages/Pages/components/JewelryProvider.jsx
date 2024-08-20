// src/ManagerPages/Pages/components/JewelryProvider.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const JewelryContext = createContext();

export const useJewelry = () => useContext(JewelryContext);

export const JewelryProvider = ({ children }) => {
  const [jewelry, setJewelry] = useState([]);
  const [original, setOriginal] = useState([]);
  const [selected, setSelected] = useState("All");
  const [selectedJewelry, setSelectedJewelry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [valuation, setValuation] = useState(0);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jewelry");
      const sortedJewelry = response.data.sort(
        (a, b) => new Date(b.createAt) - new Date(a.createAt)
      );
      setJewelry(sortedJewelry);
      setOriginal(sortedJewelry);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (jewelry) => {
    setSelectedJewelry(jewelry);
    setValuation(jewelry?.initialValuation?.value || 0);
    setShowModal(true);
  };

  const openModal2 = (jewelry) => {
    setSelectedJewelry(jewelry);
    setValuation(jewelry?.finalValuation?.value || 0);
    setShowModal2(true);
  };
  const openModal3 = (jewelry) => {
    setSelectedJewelry(jewelry);
    setShowModal3(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModal2 = () => {
    setShowModal2(false);
  };
  const closeModal3 = () => {
    setShowModal3(false);
  };

  const submitValuation = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const updatedJewelry = {
      ...selectedJewelry,
      auctionDetails: {
        ...selectedJewelry.auctionDetails,
        initialValuation: {
          value: valuation,
          staffID: user._id,
        },
      },
      status: "Preliminary Valuation Requested",
      statusUpdateDate: new Date(),
    };

    try {
      await axios.put(
        `http://localhost:5000/jewelry/${selectedJewelry._id}`,
        updatedJewelry
      );
      setJewelry((prevJewelry) =>
        prevJewelry.map((jew) =>
          jew._id === selectedJewelry._id ? { ...jew, ...updatedJewelry } : jew
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error sending initial valuation: " + error);
    }
  };
  const confirmArrival = async (jew) => {
    const updatedJewelry = {
      ...jew,
      status: "Jewelry Arrival Confirmed",
      statusUpdateDate: new Date(),
    };
    try {
      await axios.put(
        `http://localhost:5000/jewelry/${jew._id}`,
        updatedJewelry
      );
      setJewelry((prevJewelry) =>
        prevJewelry.map((j) =>
          j._id === jew._id ? { ...j, ...updatedJewelry } : j
        )
      );
      setSelectedJewelry(null); // Clear selectedJewelry after confirmation
    } catch (error) {
      console.error("Error confirming arrival: " + error);
    }
  };
  const UserApprove = async (jew) => {
    const updatedJewelry = {
      ...jew,
      status: "Approved",
      statusUpdateDate: new Date(),
    };
    try {
      await axios.put(
        `http://localhost:5000/jewelry/${jew._id}`,
        updatedJewelry
      );
      setJewelry((prevJewelry) =>
        prevJewelry.map((j) =>
          j._id === jew._id ? { ...j, ...updatedJewelry } : j
        )
      );
      setSelectedJewelry(null); // Clear selectedJewelry after confirmation
    } catch (error) {
      console.error("Error confirming arrival: " + error);
    }
  };
  const UserReject = async (jew) => {
    const updatedJewelry = {
      ...jew,
      status: "Rejected",
      statusUpdateDate: new Date(),
    };
    try {
      await axios.put(
        `http://localhost:5000/jewelry/${jew._id}`,
        updatedJewelry
      );
      setJewelry((prevJewelry) =>
        prevJewelry.map((j) =>
          j._id === jew._id ? { ...j, ...updatedJewelry } : j
        )
      );
      setSelectedJewelry(null); // Clear selectedJewelry after confirmation
    } catch (error) {
      console.error("Error confirming arrival: " + error);
    }
  };
  const ManagerApprove = async (jew, userID) => {
    const updatedJewelry = {
      ...jew,
      finalValuation: {
        ...jew.finalValuation,
        managerID: userID,
      },
      status: "Final Valuation Confirmed",
      statusUpdateDate: new Date(),
    };
    try {
      await axios.put(
        `http://localhost:5000/jewelry/${jew._id}`,
        updatedJewelry
      );
      setJewelry((prevJewelry) =>
        prevJewelry.map((j) =>
          j._id === jew._id ? { ...j, ...updatedJewelry } : j
        )
      );
      setSelectedJewelry(null); // Clear selectedJewelry after confirmation
    } catch (error) {
      console.error("Error confirming arrival: " + error);
    }
  };

  const ManagerReject = async (jew, userID) => {
    const updatedJewelry = {
      ...jew,
      finalValuation: {
        ...jew.finalValuation,
        managerID: userID,
      },
      status: "Final Valuation Rejected",
      statusUpdateDate: new Date(),
    };
    try {
      await axios.put(
        `http://localhost:5000/jewelry/${jew._id}`,
        updatedJewelry
      );
      setJewelry((prevJewelry) =>
        prevJewelry.map((j) =>
          j._id === jew._id ? { ...j, ...updatedJewelry } : j
        )
      );
      setSelectedJewelry(null); // Clear selectedJewelry after confirmation
    } catch (error) {
      console.error("Error confirming arrival: " + error);
    }
  };

  const UnconfirmArrival = async (jew) => {
    const updatedJewelry = {
      ...jew,
      status: "Preliminary Valuation Requested",
      statusUpdateDate: new Date(),
    };
    try {
      await axios.put(
        `http://localhost:5000/jewelry/${jew._id}`,
        updatedJewelry
      );
      setJewelry((prevJewelry) =>
        prevJewelry.map((j) =>
          j._id === jew._id ? { ...j, ...updatedJewelry } : j
        )
      );
      setSelectedJewelry(null); // Clear selectedJewelry after unconfirmation
    } catch (error) {
      console.error("Error unconfirming arrival: " + error);
    }
  };

  const submitValuation2 = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const updatedJewelry = {
      ...selectedJewelry,
      auctionDetails: {
        ...selectedJewelry.auctionDetails,
        finalValuation: {
          value: valuation,
          staffID: user._id,
        },
      },
      status: "Final Valuation",
      statusUpdateDate: new Date(),
    };

    try {
      await axios.put(
        `http://localhost:5000/jewelry/${selectedJewelry._id}`,
        updatedJewelry
      );
      setJewelry((prevJewelry) =>
        prevJewelry.map((jew) =>
          jew._id === selectedJewelry._id ? { ...jew, ...updatedJewelry } : jew
        )
      );
      closeModal2();
    } catch (error) {
      console.error("Error sending final valuation: " + error); // Corrected the error message
    }
  };

  const CreateAuction = async (jew, startTime, endTime) => {
    const newAuction = {
      jewelryID: jew._id,
      startTime: startTime,
      endTime: endTime,
      status: "Scheduled",
    };
    const updatedJewelry = {
      ...jew,
      status: "Scheduled",
      statusUpdateDate: new Date(),
    };
    try {
      await axios.post(`http://localhost:5000/auction`, newAuction);
      await axios.put(
        `http://localhost:5000/jewelry/${selectedJewelry._id}`,
        updatedJewelry
      );
      setJewelry((prevJewelry) =>
        prevJewelry.map((jew) =>
          jew._id === selectedJewelry._id ? { ...jew, ...updatedJewelry } : jew
        )
      );
      closeModal3();
      setSelectedJewelry(null);
    } catch (error) {
      console.error("Error creating auction: " + error);
    }
  };

  return (
    <JewelryContext.Provider
      value={{
        jewelry,
        setJewelry,
        original,
        setOriginal,
        selected,
        setSelected,
        selectedJewelry,
        setSelectedJewelry,
        showModal,
        showModal2,
        showModal3,
        openModal,
        openModal2,
        openModal3,
        closeModal,
        closeModal2,
        closeModal3,
        valuation,
        setValuation,
        submitValuation,
        submitValuation2,
        confirmArrival,
        UnconfirmArrival,
        ManagerApprove,
        ManagerReject,
        UserApprove,
        UserReject,
        CreateAuction,
      }}
    >
      {children}
    </JewelryContext.Provider>
  );
};
