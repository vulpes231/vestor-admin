/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  disableWithdraw,
  enableWithdraw,
  resetDisableWithdraw,
  resetEnableWithdraw,
} from "../features/userSlice";

const Disablewithdraw = ({ user }) => {
  const dispatch = useDispatch();
  //   console.log(user);
  const [action, setAction] = useState("disable");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    message: "",
  });

  const {
    disableLoading,
    disableError,
    disableSuccess,
    enableError,
    enableLoading,
    enableSuccess,
  } = useSelector((state) => state.users);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAction = (action) => {
    setAction(action.target.value);
  };

  const handleDisable = (e) => {
    e.preventDefault();

    if (!form.message) {
      setError("Message required!");
      return;
    }

    if (user && form.message) {
      const data = {
        userId: user._id,
        message: form.message,
      };
      dispatch(disableWithdraw(data));

      console.log("disaptchsd");
    }
  };

  const handleEnable = (e) => {
    e.preventDefault();

    dispatch(enableWithdraw({ userId: user._id }));
  };

  useEffect(() => {
    let timeout;
    if (disableSuccess || enableSuccess) {
      timeout = setTimeout(() => {
        dispatch(resetDisableWithdraw());
        dispatch(resetEnableWithdraw());
        window.location.reload();
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [disableSuccess, dispatch, enableSuccess]);

  useEffect(() => {
    if (disableError) {
      setError(disableError);
    }

    if (enableError) {
      setError(enableError);
    }
  }, [disableError, enableError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        dispatch(resetDisableWithdraw());
        dispatch(resetEnableWithdraw());
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch]);
  return (
    <div>
      <h3 className="text-[16px] capitalize font-semibold leading-[22px] py-4">
        Manage withdrawal
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center border-t p-6">
          <h3 className="text-[#979797] text-[14px] font-normal capitalize">
            withdrawal
          </h3>
          <button>
            {user.canWithdraw ? (
              <h6 className="text-green-600" size={40}>
                Enabled
              </h6>
            ) : (
              <h6 className="text-red-600" size={40}>
                Disabled
              </h6>
            )}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="capitalize text-[12px] text-[#979797] font-light"
          >
            {" "}
            action
          </label>
          <select
            className="p-2 rounded-[5px] border-[1px] w-full"
            name="action"
            onChange={handleAction}
            value={action}
          >
            <option value="">Select action</option>
            <option value="disable">Disable</option>
            <option value="enable">Enable</option>
          </select>
        </div>

        {action === "disable" ? (
          <div className="flex flex-col gap-2">
            <div>
              <label
                htmlFor=""
                className="capitalize text-[12px] text-[#979797] font-light"
              >
                {" "}
                custom message
              </label>
              <textarea
                type="text"
                rows={5}
                onChange={handleInput}
                value={form.message}
                name="message"
                className="p-2 rounded-[5px] border-[1px] w-full outline-none"
              />
            </div>
            <button
              onClick={handleDisable}
              className="bg-green-600 p-2 rounded-[5px] text-[#fff]"
            >
              {disableLoading ? "Wait..." : "Disable"}
            </button>
          </div>
        ) : (
          <div className="">
            <button
              onClick={handleEnable}
              className="bg-green-600 p-2 rounded-[5px] text-[#fff]"
            >
              {enableLoading ? "Wait..." : "Enable"}
            </button>
          </div>
        )}
      </div>
      {error && (
        <p className="fixed top-[60px] right-5 p-4 w-[280px] text-red-500 bg-[#fff] border-l-4 border-red-600 text-[14px] font-normal ">
          {error}
        </p>
      )}
      {enableSuccess && (
        <p className="fixed top-[60px] right-5 p-4 w-[280px] text-green-500 bg-[#fff] border-l-4 border-green-600 text-[14px] font-normal ">
          Withdraw enabled.
        </p>
      )}
    </div>
  );
};

export default Disablewithdraw;
