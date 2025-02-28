/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Errormodal = ({ error }) => {
  return (
    <div className="absolute top-[30px] right-5 border-red-500 border-l-4 text-red-500 p-4 bg-white text-[14px] font-sans capitalize">
      <p>{error}</p>
    </div>
  );
};

export default Errormodal;
