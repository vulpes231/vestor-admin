/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAccessToken } from "../constants";

const Ticket = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      //   dispatch();
    }
  }, [accessToken]);
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3>Tickets</h3>
        <button>create ticket</button>
      </div>

      <table className="min-w-full">
        <thead className="bg-black text-white">
          <tr>
            <th>ticket ID</th>
            <th>created by</th>
            <th>last updated </th>
            <th>status</th>
            <th>action</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default Ticket;
