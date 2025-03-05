import { useState, useEffect } from "react";

export default function QuizCountDownTimer({
  time,
  setTime,
  initialTime = 3600,
}) {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, time, setTime]);

  const formatTime = (time) => {
    // const hours = Math.floor(time / 3600)
    //   .toString()
    //   .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
    // return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-64">
      <h1 className="text-2xl font-bold">{formatTime(time)}</h1>
      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setTime(initialTime);
            setIsRunning(false);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
