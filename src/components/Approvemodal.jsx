/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveTrnx } from "../features/trnxSlice";

const Approvemodal = ({ trnxId, close, status }) => {
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(false);

  const [error, setError] = useState(false);

  const { approveTrnxLoading, approveTrnxError, trnxApproved } = useSelector(
    (state) => state.trnx
  );

  const handleSubmit = () => {
    if (!isDisabled) {
      console.log(trnxId);
      dispatch(approveTrnx(trnxId));
    } else {
      return;
    }
  };
  console.log(status);

  useEffect(() => {
    if (status[0] === "completed") {
      setIsDisabled(true);
    }
  }, [status]);

  useEffect(() => {
    if (trnxApproved) {
      window.location.reload();
    }
  }, [trnxApproved]);

  useEffect(() => {
    if (approveTrnxError) {
      setError(approveTrnxError);
    }
  }, [approveTrnxError]);

  return (
    <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white flex flex-col gap-4 w-full md:w-[300px] md:mx-auto p-6">
        <p>Approve this transaction?</p>
        <p>{status}</p>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <span className="flex items-center justify-end gap-2">
          <button
            onClick={handleSubmit}
            className={`${
              isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
            } text-white w-[180px]`}
            disabled={isDisabled}
          >
            {!approveTrnxLoading ? "Confirm" : "Wait..."}
          </button>
          <button
            onClick={() => close()}
            className="bg-red-600 text-white w-[180px]"
          >
            Back
          </button>
        </span>
      </div>
    </div>
  );
};

export default Approvemodal;
