/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { styles } from "../constants/styles";
import { format } from "date-fns";
import { MdLogout, MdTimelapse } from "react-icons/md";

const Dashboard = () => {
  const [lastLogin, setLastLogin] = useState("");

  const currentDate = format(new Date(), "dd-MMM-yyyy");
  const currentTime = format(new Date(), "HH:mm a");

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
            <span className="text-sm flex items-center gap-1 font-medium underline">
              <MdLogout />
              Logout
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
