import React, { useState, useEffect } from "react";

const CountdownTimer = ({ startTime, endTime }) => {
  const calculateTimeLeft = (targetDate) => {
    if (!targetDate) return {};

    const difference = +new Date(targetDate) - +new Date();
    // Calculate the time difference between now and the targetDate.
    let timeLeft = {};

    if (difference > 0) {
      // If the difference is positive (targetDate is in the future), calculate time left.
      timeLeft = {
        months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)),
        // Calculate remaining months.
        days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30),
        // Calculate remaining days
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        // Calculate remaining hours
        minutes: Math.floor((difference / 1000 / 60) % 60),
        // Calculate remaining minutes
        seconds: Math.floor((difference / 1000) % 60),
        // Calculate remaining seconds.
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
    // Determine if we are before the start time or after it.
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
    const difference = +new Date(endTime) - +new Date();
    const isLessThanOneHour = difference <= 1000 * 60 * 60;

    if (isLessThanOneHour) {
      return (
        <span>
          {timeLeft.minutes} minutes {timeLeft.seconds} seconds
        </span>
      );
    } else if (timeLeft.days > 0) {
      return (
        <span>
          {timeLeft.days} days {timeLeft.hours} hours
        </span>
      );
    } else if (timeLeft.hours > 0) {
      return <span>{timeLeft.hours} hours</span>;
    } else if (timeLeft.months > 0) {
      return <span>{timeLeft.months} months</span>;
    }

    return null;
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
    return <span>Auction has ended</span>;
  }
};

export default CountdownTimer;
