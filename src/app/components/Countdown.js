"use client";

import { useEffect, useState } from "react";

export default function Countdown() {

const targetDate = new Date(Date.now() + 2 * 60 * 1000);

  const [timeLeft, setTimeLeft] = useState("00:00:00");

  useEffect(() => {

    const interval = setInterval(() => {

      const now = new Date();

      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft("00:00:00");
        clearInterval(interval);
        return;
      }

      const hours = String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0");

      const minutes = String(
        Math.floor((difference / 1000 / 60) % 60)
      ).padStart(2, "0");

      const seconds = String(
        Math.floor((difference / 1000) % 60)
      ).padStart(2, "0");

      setTimeLeft(`${hours}:${minutes}:${seconds}`);

    }, 1000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "72px",
        fontWeight: "bold",
        color: "#142c6e",
        marginBottom: "40px",
      }}
    >
      {timeLeft}
    </div>
  );
}