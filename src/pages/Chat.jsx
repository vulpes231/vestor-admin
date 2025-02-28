/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../constants";
import {
  getUserTicket,
  replyTicket,
  resetReply,
} from "../features/ticketSlice";
import { FaUser } from "react-icons/fa";

const Chat = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const { ticketId } = useParams();
  const [form, setForm] = useState({ message: "" });
  const [error, setError] = useState("");

  const { userTicket, replyTicketLoading, replyTicketError, ticketReplied } =
    useSelector((state) => state.ticket);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!form.message) {
      setError("Enter a message!");
      return;
    }
    const data = {
      message: form.message,
      ticketId: ticketId,
    };
    dispatch(replyTicket(data));
  };

  useEffect(() => {
    if (replyTicketError) {
      setError(replyTicketError);
    }
  }, [replyTicketError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        dispatch(resetReply());
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error, dispatch]);

  useEffect(() => {
    let timeout;
    if (ticketReplied) {
      timeout = setTimeout(() => {
        dispatch(resetReply());
        // dispatch(getUserTicket());
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [ticketReplied, dispatch]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserTicket(ticketId));
    }
  }, [dispatch, accessToken, ticketId]);

  return (
    <div className="p-6 bg-slate-200 h-screen">
      <div className="py-2 px-1">
        <h3 className="text-[16px] font-semibold text-[#213325] capitalize py-5">
          Admin chat
        </h3>
        <h6 className="text-[14px] font-normal text-[#979797]">
          Ticket ID: {ticketId}
        </h6>
        <h6 className="text-[14px] font-normal text-[#979797]">
          Subject: {userTicket.subject}
        </h6>
        <h6 className="text-[14px] font-normal text-[#979797]">
          Status: {userTicket.status}
        </h6>
        <h6 className="text-[14px] font-normal text-[#979797]">
          Created: {userTicket.createdAt}
        </h6>
      </div>

      <div className="flex flex-col gap-4">
        <div
          className={`border border-[#dedede] h-[400px] overflow-auto bg-white/40 text-slate-800 p-6 flex flex-col w-full`}
        >
          {userTicket &&
            userTicket.messages.map((msg, index) => {
              const isUserMessage = userTicket.creator === msg.sender;
              return (
                <div
                  key={index}
                  className={`${
                    !isUserMessage ? " justify-start" : " justify-end"
                  } mb-4 w-full flex items-start `}
                >
                  <div
                    className={`${
                      isUserMessage
                        ? "ml-auto bg-blue-500/20"
                        : "mr-auto bg-green-500/20"
                    } max-w-[250px] rounded-[8px] p-4 w-full flex flex-col gap-2`}
                  >
                    <div className="flex items-center gap-2">
                      <FaUser size={15} className="text-[#979797]" />
                      <h6 className="text-[10px] text-[#979797] font-normal">
                        {isUserMessage ? userTicket.email : "Admin"}
                      </h6>
                    </div>

                    <p className="text-[14px] font-medium text-[#213325] leading-[22px]">
                      {msg.msg}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        <form action="" onSubmit={handleSend} className="flex flex-col gap-2">
          <textarea
            rows={3}
            value={form.message}
            onChange={handleInput}
            name="message"
            className="resize-none w-full p-2 border border-[#dedede] rounded-[5px]"
          ></textarea>

          <button
            type="submit"
            className="bg-green-600 text-[#fff] rounded-[5px] w-[110px] h-[38px] w-full"
          >
            {!replyTicketLoading ? "Send" : "Sending..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
