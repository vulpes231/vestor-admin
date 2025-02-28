/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Successmodal = ({ successText }) => {
  return (
    <div className="absolute top-[30px] right-5 border-green-500 border-l-4 text-green-500 p-4 bg-white text-[14px] font-sans capitalize">
      <h3>{successText}</h3>
    </div>
  );
};

export default Successmodal;
