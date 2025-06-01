// src/Components/Loader/LinearLoader.js
import { LinearProgress } from "@mui/material";

const LinearLoader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <LinearProgress />
    </div>
  );
};

export default LinearLoader;
