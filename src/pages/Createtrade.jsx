/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getUsers } from "../features/userSlice";
import { createTrade, getUserBots } from "../features/poolSlice";

const markets = [
  {
    id: "gold",
    name: "XAU/USD",
  },
  {
    id: "bitcoin",
    name: "BTC/USD",
  },
  {
    id: "ethereum",
    name: "ETH/USD",
  },
  {
    id: "amazon",
    name: "AMZN",
  },
  {
    id: "netflix",
    name: "NFLX",
  },
  {
    id: "apple",
    name: "APL",
  },
  {
    id: "doge",
    name: "DOGE/USDT",
  },
];

const tradeStyle = {
  label: "text-[14px] text-[#979797] leading-[22px] capitalize font-normal",
  select:
    "text-[12px] text-[#212325] leading-[22px] capitalize font-normal h-[38px] border border-[#DEDEDE] bg-white p-2",
  formHolder: "flex flex-col gap-1",
  button:
    "bg-green-600 text-white font-medium w-[120px] h-[38px] rounded-[5px] capitalize text-[16px]",
};

const Createtrade = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const [form, setForm] = useState({
    userId: "",
    botId: "",
    market: "",
    amount: "",
  });
  const [error, setError] = useState("");

  const { users } = useSelector((state) => state.users);
  const { userBots, createTradeError, createTradeLoading, tradeCreated } =
    useSelector((state) => state.invest);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in form) {
      if (form[key] === "") {
        setError(`${key} required!`);
        return;
      }
    }
    console.log(form);
    dispatch(createTrade(form));
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getUsers());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (accessToken && form.userId) {
      dispatch(getUserBots(form.userId));
    }
  }, [accessToken, dispatch, form.userId]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    let timeout;
    if (tradeCreated) {
      timeout = setTimeout(() => {
        window.location.href = "/pools";
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [tradeCreated]);

  useEffect(() => {
    if (createTradeError) {
      setError(createTradeError);
    }
  }, [createTradeError]);

  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white w-[420px] mx-auto rounded-[10px] flex flex-col gap-4">
        <h3 className="text-[#212325]/80 text-[16px] font-semibold leading-[21px] capitalize">
          create new trade
        </h3>
        <form action="" className="flex flex-col gap-4">
          <div className={tradeStyle.formHolder}>
            <label className={tradeStyle.label} htmlFor="">
              select user
            </label>
            <select
              onChange={handleInput}
              value={form.userId}
              className={tradeStyle.select}
              name="userId"
            >
              <option value="">Select User</option>
              {users &&
                users.map((usr) => {
                  return (
                    <option value={usr._id} key={usr._id}>
                      {usr.email}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className={tradeStyle.formHolder}>
            <label className={tradeStyle.label} htmlFor="">
              select user plan
            </label>
            <select
              onChange={handleInput}
              value={form.botId}
              className={tradeStyle.select}
              name="botId"
            >
              <option value="">Select User Plan</option>
              {userBots &&
                userBots.map((bot) => {
                  return (
                    <option value={bot._id} key={bot._id}>
                      {bot.name} : ${bot.amountManaged}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className={tradeStyle.formHolder}>
            <label className={tradeStyle.label} htmlFor="">
              select asset/stock
            </label>
            <select
              className={tradeStyle.select}
              onChange={handleInput}
              value={form.market}
              name="market"
            >
              <option value="">Select asset/stock</option>
              {markets.map((asset) => {
                return (
                  <option key={asset.id} value={asset.name}>
                    {asset.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={tradeStyle.formHolder}>
            <label className={tradeStyle.label} htmlFor="">
              amount
            </label>
            <input
              type="text"
              className={tradeStyle.select}
              placeholder="$0"
              onChange={handleInput}
              value={form.amount}
              name="amount"
            />
          </div>
          <div>
            <button onClick={handleSubmit} className={tradeStyle.button}>
              create trade
            </button>
          </div>
        </form>
      </div>
      {error && (
        <p className="absolute top-[30px] right-5 border-red-500 border-l-4 text-red-500 p-4 bg-white text-[14px] font-sans capitalize">
          {error}
        </p>
      )}
      {createTradeLoading && (
        <div className="h-screen fixed p-6 flex items-center justify-center bg-slate-900/50 w-full">
          <h3>Creating Trade...</h3>
        </div>
      )}
      {tradeCreated && (
        <div className="absolute top-[30px] right-5 border-green-500 border-l-4 text-green-500 p-4 bg-white text-[14px] font-sans capitalize">
          <h3>Trade created</h3>
        </div>
      )}
    </div>
  );
};

export default Createtrade;
