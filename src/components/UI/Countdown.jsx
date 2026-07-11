import { useState, useEffect } from "react";

const Countdown = ({ expiry }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    function updateTimer() {
      const now = Date.now();
      const diff = expiry - now;

      if (diff <= 0 || isNaN(diff)) {
        setTimeLeft("00h 00m 00s");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${String(hours).padStart(1, "0")}h ` +
        `${String(minutes).padStart(2, "0")}m ` +
        `${String(seconds).padStart(2, "0")}s`
      );
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiry]);

  return <div className="de_countdown">{timeLeft}</div>;
};

export default Countdown;
