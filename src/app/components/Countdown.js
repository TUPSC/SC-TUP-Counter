"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setHours(13, 0, 0, 0);

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hours = String(
        Math.floor(difference / (1000 * 60 * 60))
      ).padStart(2, "0");

      const minutes = String(
        Math.floor((difference / (1000 * 60)) % 60)
      ).padStart(2, "0");

      const seconds = String(
        Math.floor((difference / 1000) % 60)
      ).padStart(2, "0");

      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "72px",
        fontWeight: "bold",
        color: "white",
        marginBottom: "40px",
      }}
    >
      {timeLeft}
    </div>
  );
}