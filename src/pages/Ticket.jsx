/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getAllTickets } from "../features/ticketSlice";

import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const ticketStyle = {
  th: "px-4 py-2 capitalize font-semibold text-[14px]",
  td: "px-4 py-3 font-medium text-[13px] text-[#212325]/80 text-center",
};

const Ticket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const [action, setAction] = useState("");
  const [ticketId, setTicketId] = useState("");

  const { tickets } = useSelector((state) => state.ticket);

  const handleAction = (e, id) => {
    setAction(e.target.value);
    setTicketId(id);
  };

  useEffect(() => {
    if (action && ticketId) {
      if (action === "reply") {
        navigate(`/chat/${ticketId}`);
      } else {
        console.log("Delete ", ticketId);
      }
    }
  }, [action, ticketId, navigate]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllTickets());
    }
  }, [accessToken, dispatch]);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-[#213325]">Tickets</h3>
        <button>create ticket</button>
      </div>

      <div className="bg-white overflow-auto">
        {tickets.length > 0 ? (
          <table className="min-w-full">
            <thead className="bg-black text-white ">
              <tr>
                <th className={ticketStyle.th}>ticket ID</th>
                <th className={ticketStyle.th}>creator</th>
                <th className={ticketStyle.th}>created</th>
                <th className={ticketStyle.th}>message count</th>
                <th className={ticketStyle.th}>status</th>
                <th className={ticketStyle.th}>action</th>
              </tr>
            </thead>
            <tbody>
              {tickets &&
                tickets.map((tck, index) => {
                  return (
                    <tr
                      key={tck._id}
                      className={
                        index % 2 === 0 ? "bg-slate-200" : "bg-slate-100"
                      }
                    >
                      <td className={ticketStyle.td}>{tck._id}</td>
                      <td className={ticketStyle.td}>{tck.email}</td>
                      <td className={ticketStyle.td}>
                        {format(tck.createdAt, "dd MMM, yyyy hh:mm a")}
                      </td>
                      <td className={ticketStyle.td}>{tck.messages.length}</td>
                      <td className={ticketStyle.td}>
                        <span
                          className={`${
                            tck.status === "open"
                              ? "bg-green-600/50"
                              : "bg-red-600/30"
                          } px-4 py-1.5 rounded-[5px] text-[#fff] capitalize`}
                        >
                          {tck.status}
                        </span>
                      </td>
                      <td className={ticketStyle.td}>
                        <span>
                          <select
                            name="action"
                            className="bg-white px-3 py-1 rounded-[5px]"
                            value={action}
                            onChange={(e) => handleAction(e, tck._id)}
                          >
                            <option value="">Choose Action</option>
                            <option value="reply">Reply</option>
                            <option value="delete">Delete</option>
                          </select>
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center ">
            <h3>You have no tickets</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ticket;
