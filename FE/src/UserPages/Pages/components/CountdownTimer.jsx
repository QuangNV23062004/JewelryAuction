import React, { useState, useEffect } from "react";

const CountdownTimer = ({ startTime, endTime, user, winner, status }) => {
  const calculateTimeLeft = (targetDate) => {
    if (!targetDate) return {};

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
    if (!startTime || !endTime) return {};

    if (new Date() < new Date(startTime)) {
      return calculateTimeLeft(startTime);
    } else {
      return calculateTimeLeft(endTime);
    }
  });

  useEffect(() => {
    if (!startTime || !endTime) return;

    const timer = setInterval(() => {
      if (new Date() < new Date(startTime)) {
        setTimeLeft(calculateTimeLeft(startTime));
      } else {
        setTimeLeft(calculateTimeLeft(endTime));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, endTime]);

  const renderTimerComponents = () => {
    const { days, hours, minutes, seconds } = timeLeft;

    // If more than 1 day left, show days and hours
    if (days > 0) {
      return (
        <span>
          {days} days {hours} hours
        </span>
      );
    }
    // If less than 1 day but more than 1 hour, show only hours
    else if (hours > 0) {
      return <span>{hours} hours</span>;
    }
    // If less than 1 hour, show minutes and seconds
    else {
      return (
        <span>
          {minutes} minutes {seconds} seconds
        </span>
      );
    }
  };

  const renderCheckoutTimerComponents = () => {
    const checkoutEndTime = new Date(endTime);
    checkoutEndTime.setTime(
      checkoutEndTime.getTime() + 1000 * 60 * 60 * 24 * 7
    ); // Add 7 days
    const timeLeftForCheckout = calculateTimeLeft(checkoutEndTime);
    const { days, hours, minutes, seconds } = timeLeftForCheckout;

    // If more than 1 day left, show days and hours
    if (days > 0) {
      return (
        <span>
          {days} days {hours} hours
        </span>
      );
    }
    // If less than 1 day but more than 1 hour, show only hours
    else if (hours > 0) {
      return <span>{hours} hours</span>;
    }
    // If less than 1 hour, show minutes and seconds
    else {
      return (
        <span>
          {minutes} minutes {seconds} seconds
        </span>
      );
    }
  };

  const currentTime = new Date();
  const auctionEnded = currentTime >= new Date(endTime);
  const isWinner = user && winner && user === winner; // Safely check if both user and winner exist

  if (!startTime || !endTime) {
    return <span>Coming soon</span>;
  }

  if (currentTime < new Date(startTime)) {
    return (
      <span>
        Starting in: {renderTimerComponents() || <span>Coming soon</span>}
      </span>
    );
  } else if (
    currentTime >= new Date(startTime) &&
    currentTime < new Date(endTime)
  ) {
    return (
      <span>
        Started - Ending in:{" "}
        {renderTimerComponents() || <span>Coming soon</span>}
      </span>
    );
  } else {
    return (
      <>
        <span>Auction has ended</span>
        <br />
        {isWinner && status === "Pending" && (
          <span>
            You have {renderCheckoutTimerComponents()} to checkout, or your bid
            will be invalid.
          </span>
        )}
      </>
    );
  }
};

export default CountdownTimer;
