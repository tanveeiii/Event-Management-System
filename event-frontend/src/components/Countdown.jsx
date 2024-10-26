import React, { useState, useEffect } from 'react';
import '../static/Homepage.css'
import Button from './Button';

function Countdown() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2024-12-31T00:00:00");
    const now = new Date();
    const difference = targetDate - now;

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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className='count' style={{ textAlign: 'center', marginTop: '20px' }}>
      {timeLeft.days !== undefined ? (
        <div className="countdown">
          <div className="time">
            <span id="days">{timeLeft.days}</span>
            <p>Days</p>
          </div>
          <div className="time">
            <span id="hours">{timeLeft.hours}</span>
            <p>Hours</p>
          </div>
          <div className="time">
            <span id="minutes">{timeLeft.minutes}</span>
            <p>Minutes</p>
          </div>
          <div className="time">
            <span id="seconds">{timeLeft.seconds}</span>
            <p>Seconds</p>
          </div>
        </div>

      ) : (
        <p className='countOver'>Event Has Started!</p>
      )}
      <Button/>
    </div>
  );
}

export default Countdown;
