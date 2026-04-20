/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { styles } from "../constants/styles";
import { format } from "date-fns";
import { MdLogout, MdTimelapse } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { logoutAdmin } from "../features/logoutSlice";
import Successmodal from "../components/Successmodal";
import Errormodal from "../components/Errormodal";

const Dashboard = () => {
  const token = getAccessToken();
  const dispatch = useDispatch();
  const [lastLogin, setLastLogin] = useState("");

  const currentDate = format(new Date(), "dd-MMM-yyyy");
  const currentTime = format(new Date(), "HH:mm a");

  const [error, setError] = useState("");

  const { logoutLoading, logoutError, loggedOut } = useSelector(
    (state) => state.logout,
  );

  const handleLogout = (e) => {
    e.preventDefault();
    // if (!token) {
    //   setError("Invalid Action!.");
    //   sessionStorage.clear();
    //   window.location.href = "/";
    //   return;
    // }

    dispatch(logoutAdmin());
  };

  useEffect(() => {
    if (logoutError) {
      setError(logoutError);
    }
  }, [logoutError]);

  useEffect(() => {
    if (error) {
      const tmt = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(tmt);
    }
  }, [error]);

  useEffect(() => {
    if (loggedOut) {
      const tmt = setTimeout(() => {
        sessionStorage.clear();
        window.location.href = "/";
      }, 3000);

      return () => clearTimeout(tmt);
    }
  }, [loggedOut]);

  useEffect(() => {
    if (currentDate && currentTime) {
      setLastLogin(`${currentDate} @ ${currentTime}`);
    }
  }, [currentDate, currentTime]);
  return (
    <section className={`${styles.authWrapper}`}>
      {/* <span className="">{toggle ? <MdMenu /> : <MdClose />}</span> */}
      <div className="flex flex-col h-full">
        <div className="p-6 capitalize flex justify-between items-center w-full">
          <h3>hello admin</h3>
          <span className="">
            <p className="text-xs flex items-center gap-1">
              {" "}
              <MdTimelapse /> {lastLogin}
            </p>
            <button
              type="button"
              onClick={handleLogout}
              className="text-sm flex items-center gap-1 font-medium bg-black/70 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-black/50 mt-2"
            >
              <MdLogout />
              {logoutLoading ? "Wait..." : "Logout"}
            </button>
          </span>
        </div>
      </div>
      {loggedOut && <Successmodal successText={"Logged Out."} />}
      {error && <Errormodal error={error} />}
    </section>
  );
};

export default Dashboard;
