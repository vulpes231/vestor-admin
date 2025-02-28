/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Loadingmodal = ({ loadingText }) => {
  return (
    <div className="h-screen fixed p-6 flex items-center justify-center bg-slate-900/50 w-full">
      <h3>{loadingText}</h3>
    </div>
  );
};

export default Loadingmodal;
