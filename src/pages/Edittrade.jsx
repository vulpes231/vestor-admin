/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../constants";
import {
  closeTrade,
  editTrade,
  getTrade,
  resetCloseTrade,
  resetEditTrade,
} from "../features/poolSlice";
import Errormodal from "../components/Errormodal";
import Loadingmodal from "../components/Loadingmodal";
import Successmodal from "../components/Successmodal";

const editStyle = {
  formHolder: "flex flex-col gap-1",
  label: "text-[14px] leading-[22px] font-normal text-[#979797]",
  input: "h-[38px] p-2 border border-[#dedede] rounded-[5px]",
  select: "h-[38px] p-2 border border-[#dedede] rounded-[5px]",
};

const Edittrade = () => {
  const { tradeId } = useParams();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const {
    trade,
    editTradeError,
    editTradeLoading,
    tradeEdited,
    closeTradeError,
    closeTradeLoading,
    positionClosed,
  } = useSelector((state) => state.invest);

  const [form, setForm] = useState({
    amount: "",
    action: "",
  });

  const [error, setError] = useState("");

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!form.amount) {
      setError("Enter amount!");
      return;
    }
    const data = {
      roi: form.amount,
      action: form.action,
      tradeId: tradeId,
    };
    dispatch(editTrade(data));
  };

  const handleCloseTrade = (e) => {
    e.preventDefault();

    dispatch(closeTrade({ tradeId: tradeId }));
  };

  useEffect(() => {
    if (editTradeError) {
      setError(editTradeError);
    }
  }, [editTradeError]);

  useEffect(() => {
    if (closeTradeError) {
      setError(closeTradeError);
    }
  }, [closeTradeError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        dispatch(resetEditTrade());
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error, dispatch]);

  useEffect(() => {
    let timeout;
    if (tradeEdited) {
      timeout = setTimeout(() => {
        dispatch(resetEditTrade());
        dispatch(resetCloseTrade());
        // dispatch(getUserTicket());
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [tradeEdited, dispatch]);

  useEffect(() => {
    let timeout;
    if (positionClosed) {
      timeout = setTimeout(() => {
        dispatch(resetCloseTrade());
        // dispatch(getUserTicket());
        window.location.href = "/pools";
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [positionClosed, dispatch]);

  useEffect(() => {
    if (accessToken && tradeId) {
      dispatch(getTrade(tradeId));
    }
  }, [accessToken, tradeId, dispatch]);

  return (
    <div className="bg-slate-200 h-screen flex items-center justify-center">
      <div className="flex flex-col gap-6 p-6 bg-white w-[400px] mx-auto">
        <span className="flex justify-between items-center">
          <h3 className="text-[18px] leading-[22px] font-semibold text-[#213325]">
            Edit trade
          </h3>
          <button onClick={handleCloseTrade}>close trade</button>
        </span>
        {/* <h6>{tradeId}</h6> */}

        <hr />

        <div className="text-[14px] leading-[22px] font-medium text-[#979797] text-center">
          <p>
            Position opened with ${trade.amount} on the asset {trade.market}
          </p>
          <p>
            Your current profit/ Loss is{" "}
            <span
              className={`${
                trade.roi > 0 ? "text-green-500" : "text-red-500"
              } font-bold text-[18px]`}
            >
              ${trade.roi}
            </span>
          </p>
        </div>

        <form onSubmit={handleSend} className="flex flex-col gap-4">
          <div className={editStyle.formHolder}>
            <label className={editStyle.label} htmlFor="">
              Enter amount to add or subtract from the ROI(profit)
            </label>
            <input
              type="text"
              placeholder="0.00"
              name="amount"
              onChange={handleInput}
              value={form.amount}
              className={editStyle.input}
            />
          </div>
          <div className={editStyle.formHolder}>
            <label className={editStyle.label} htmlFor="">
              Enter amount to add or subtract from the ROI(profit)
            </label>
            <select
              name="action"
              onChange={handleInput}
              value={form.action}
              className={editStyle.select}
            >
              <option value="">Choose Action</option>
              <option value="add">add</option>
              <option value="subtract">subtract</option>
            </select>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      {error && <Errormodal error={error} />}
      {editTradeLoading && <Loadingmodal loadingText={"Updating Trade..."} />}
      {closeTradeLoading && <Loadingmodal loadingText={"Closing Trade..."} />}
      {tradeEdited && <Successmodal successText={"Trade Updated."} />}
      {positionClosed && <Successmodal successText={"Trade Closed."} />}
    </div>
  );
};

export default Edittrade;
