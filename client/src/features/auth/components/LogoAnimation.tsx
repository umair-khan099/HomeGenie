import { Typography } from "@mui/material";
import React from "react";

const LogoAnimation = () => {
  return (
    <div className="hidden md:w-[55%] h-full md:flex justify-center items-center">
      {/* Leave blank for your animation element later */}
      <Typography variant="h3" sx={{ color: "red" }}>
        <span>Home</span>
        <span>Genie</span>
      </Typography>
    </div>
  );
};

export default LogoAnimation;
