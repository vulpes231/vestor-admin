/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken, isValidDateFormat } from "../constants";
import { getUsers } from "../features/userSlice";
// import { Createtransaction, getUserBots } from "../features/poolSlice";
import Loadingmodal from "../components/Loadingmodal";
import Errormodal from "../components/Errormodal";
import Successmodal from "../components/Successmodal";
import { createTrnx, resetAddTransaction } from "../features/trnxSlice";

const tradeStyle = {
  label: "text-[13px] text-[#979797] leading-[22px] capitalize font-normal",
  select:
    "text-[12px] text-[#212325] leading-[22px] capitalize font-normal h-[38px] border border-[#DEDEDE] bg-white p-2",
  input:
    "text-[16px] text-[#212325] leading-[22px] font-normal h-[38px] border border-[#DEDEDE] bg-white p-2 outline-none",
  formHolder: "flex flex-col gap-1",
  button:
    "bg-green-600 text-white font-bold w-[189px] h-[38px] rounded-[5px] capitalize text-[16px]",
};

const Createtransaction = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const [form, setForm] = useState({
    userId: "",
    type: "",
    coin: "btc",
    amount: "",
    memo: "",
    date: "",
    method: "",
  });
  const [error, setError] = useState("");

  const { users } = useSelector((state) => state.users);
  const { createTrnxLoading, createTrnxError, trnxCreated } = useSelector(
    (state) => state.trnx
  );

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidDateFormat(form.date)) {
      setError("Invalid date format. use MMM DD YYYY");
      return;
    }

    console.log(form);
    // dispatch(createTrnx(form));
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getUsers());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        dispatch(resetAddTransaction());
        setError("");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch]);

  useEffect(() => {
    let timeout;
    if (trnxCreated) {
      timeout = setTimeout(() => {
        dispatch(resetAddTransaction());
        window.location.href = "/trnxs";
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [trnxCreated, dispatch]);

  useEffect(() => {
    if (createTrnxError) {
      setError(createTrnxError);
    }
  }, [createTrnxError]);

  return (
    <div className="bg-slate-200 min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white w-[420px] mx-auto rounded-[10px] flex flex-col gap-4">
        <h3 className="text-[#212325]/80 text-[16px] font-semibold leading-[21px] capitalize">
          create new transaction
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
              method
            </label>
            <select
              onChange={handleInput}
              value={form.method}
              className={tradeStyle.select}
              name="method"
            >
              <option value="">select method</option>
              <option value="coin">coin</option>
              <option value="bank">bank</option>
            </select>
          </div>

          {form.method === "coin" && (
            <div className={tradeStyle.formHolder}>
              <label className={tradeStyle.label} htmlFor="">
                coin
              </label>
              <select
                onChange={handleInput}
                value={form.coin}
                className={tradeStyle.select}
                name="coin"
              >
                <option value="btc">btc</option>
                <option value="ethErc">ethErc</option>
                <option value="ethTrc">ethTrc</option>
                <option value="usdtErc">usdtErc</option>
                <option value="usdtTrc">usdtTrc</option>
              </select>
            </div>
          )}
          {/* <div className={tradeStyle.formHolder}>
            <label className={tradeStyle.label} htmlFor="">
              select type
            </label>
            <select
              onChange={handleInput}
              value={form.type}
              className={tradeStyle.select}
              name="type"
            >
              <option value="">select type</option>
              <option value="debit">debit</option>
              <option value="credit">credit</option>
            </select>
          </div> */}

          <div className={tradeStyle.formHolder}>
            <label className={tradeStyle.label} htmlFor="">
              amount
            </label>
            <input
              type="text"
              className={tradeStyle.input}
              placeholder="$0"
              onChange={handleInput}
              value={form.amount}
              name="amount"
              autoComplete="off"
            />
          </div>
          <div className={tradeStyle.formHolder}>
            <label className={tradeStyle.label} htmlFor="">
              date
            </label>
            <input
              type="text"
              className={tradeStyle.input}
              placeholder="E.g. Feb 25 2025"
              onChange={handleInput}
              value={form.date}
              name="date"
              autoComplete="off"
            />
          </div>
          <div className={tradeStyle.formHolder}>
            <label className={tradeStyle.label} htmlFor="">
              memo
            </label>
            <input
              type="text"
              className={tradeStyle.input}
              placeholder="Description"
              onChange={handleInput}
              value={form.memo}
              name="memo"
              autoComplete="off"
            />
          </div>
          <div>
            <button onClick={handleSubmit} className={tradeStyle.button}>
              create transaction
            </button>
          </div>
        </form>
      </div>
      {error && <Errormodal error={error} />}
      {createTrnxLoading && (
        <Loadingmodal loadingText={"Creating Transaction..."} />
      )}
      {trnxCreated && <Successmodal successText={"Transaction Created."} />}
    </div>
  );
};

export default Createtransaction;
