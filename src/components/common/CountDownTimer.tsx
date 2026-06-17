"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(targetDate).getTime() - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  // Avoid using Date.now() during initial render to prevent
  // hydration mismatches between server and client.
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // set initial value on mount and start interval
    const update = () => setTimeLeft(calculateTimeLeft());

    update();
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const format = (value: number) => value.toString().padStart(2, "0");

  return (
    <div className="flex gap-6">
      <TimeBlock label="Days" value={format(timeLeft.days)} />

      <Colon />

      <TimeBlock label="Hours" value={format(timeLeft.hours)} />

      <Colon />

      <TimeBlock label="Minutes" value={format(timeLeft.minutes)} />

      <Colon />

      <TimeBlock label="Seconds" value={format(timeLeft.seconds)} />
    </div>
  );
}

function TimeBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium">{label}</p>

      <p className="text-[32px] font-bold leading-[30px]">{value}</p>
    </div>
  );
}

function Colon() {
  return <span className="mt-3 text-3xl font-bold text-[#E07575]">:</span>;
}
