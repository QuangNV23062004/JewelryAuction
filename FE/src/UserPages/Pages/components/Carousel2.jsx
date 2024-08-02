import React, { useState, useEffect } from "react";

const Carousel2 = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      shiftCategories();
    }, 2000); // Adjust the time as needed

    return () => clearInterval(interval);
  }, [currentIndex]);

  const shiftCategories = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const getVisibleCategories = () => {
    const visibleCategories = [];
    for (let i = 0; i < 6; i++) {
      const index = (currentIndex + i) % categories.length;
      visibleCategories.push(categories[index]);
    }
    return visibleCategories;
  };

  const carouselContainerStyle = {
    width: "100%",
    overflow: "hidden",
    position: "relative",
  };

  const carouselStyle = {
    display: "flex",
    transition: "transform 0.5s ease-in-out",
  };

  const categoryStyle = {
    minWidth: "calc(100% / 6)",
    boxSizing: "border-box",
    padding: "10px",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ddd",
  };

  return (
    <div style={carouselContainerStyle}>
      <div style={carouselStyle}>
        {getVisibleCategories().map((item, index) => (
          <div key={index} style={categoryStyle}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel2;
