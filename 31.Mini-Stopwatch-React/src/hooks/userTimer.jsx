import React, { useState, useRef, useCallback } from 'react';

const useTimer = () => {
  const [centisecond, setCentisecond] = useState(0);
  const [lapCount, setLapCount] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [timerInterval, setTimerInterval] = useState(null);
  const [laps, setLaps] = useState([]);

  let prevLap = useRef(0);

  const start = useCallback(() => {
    let _interval = setInterval(() => {
      setCentisecond((prev) => prev + 1);
    }, 10);
    setTimerInterval(_interval);
    setIsRunning((prev) => !prev);
  }, [timerInterval])

  const pause = useCallback(() => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setIsRunning((prev) => !prev);
  }, [timerInterval])

  const createLap = () => {
    setLapCount((prev) => prev + 1);
    const lapTime = centisecond - prevLap.current;
    setLaps((prev) => [[lapCount, lapTime], ...prev]);
    prevLap.current = centisecond;
  }

  const reset = useCallback(() => {
    setCentisecond(0);
    setLapCount(1);
    prevLap.current = 0;
    setLaps([]);
  }, [])

  return { centisecond, start, pause, createLap, reset, isRunning, laps };
}

export default useTimer