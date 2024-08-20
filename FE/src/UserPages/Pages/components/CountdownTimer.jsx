import React, { useState, useEffect } from "react";

const CountdownTimer = ({ startTime, endTime }) => {
  const calculateTimeLeft = (targetDate) => {
    if (!targetDate) return {}; // Handle cases where targetDate is undefined

    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(() => {
    if (!startTime || !endTime) {
      return {}; // If no startTime or endTime, return an empty object
    }
    if (new Date() < new Date(startTime)) {
      return calculateTimeLeft(startTime); // Before the start time
    } else {
      return calculateTimeLeft(endTime); // After the start time
    }
  });

  useEffect(() => {
    if (!startTime || !endTime) return; // Exit early if no startTime or endTime

    const timer = setInterval(() => {
      if (new Date() < new Date(startTime)) {
        setTimeLeft(calculateTimeLeft(startTime)); // Before the start time
      } else {
        setTimeLeft(calculateTimeLeft(endTime)); // After the start time
      }
    }, 1000);

    return () => clearInterval(timer); // Clear timer on component unmount
  }, [startTime, endTime]); // Re-run effect when startTime or endTime changes

  const renderTimerComponents = () => {
    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
      if (timeLeft[interval]) {
        timerComponents.push(
          <span key={interval}>
            {timeLeft[interval]} {interval}{" "}
          </span>
        );
      }
    });

    return timerComponents.length ? timerComponents : null;
  };

  if (!startTime || !endTime) {
    return <span>Coming soon</span>;
  }

  if (new Date() < new Date(startTime)) {
    return (
      <span>
        Starting in: {renderTimerComponents() || <span>Coming soon</span>}
      </span>
    );
  } else if (
    new Date() >= new Date(startTime) &&
    new Date() < new Date(endTime)
  ) {
    return (
      <span>
        Started - Ending in:{" "}
        {renderTimerComponents() || <span>Coming soon</span>}
      </span>
    );
  } else {
    return <span>Event has ended</span>;
  }
};

export default CountdownTimer;
