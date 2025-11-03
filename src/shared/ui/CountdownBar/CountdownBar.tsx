"use client";

import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

function CountdownBar() {
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    const duration = 10_000;
    const interval = 100;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const getBarGradient = (): string => {
    return "linear-gradient(90deg, #FF7F7F, #FF0000, #8B0000)";
  };

  return (
    <div style={{ width: "100%" }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 14,
          borderRadius: 7,
          backgroundColor: "#330000",
          "& .MuiLinearProgress-bar": {
            background: getBarGradient(),
          },
        }}
      />
    </div>
  );
}

export default CountdownBar;
