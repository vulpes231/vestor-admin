/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetWallet, setUserWallet } from "../features/userSlice";

const Walletinfo = ({ user }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({ address: "" });
  const [error, setError] = useState("");

  const { setWalletLoading, setWalletError, setWalletSuccess } = useSelector(
    (state) => state.users
  );

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.address) {
      setError("Address required!");
      return;
    }
    const data = {
      userId: user._id,
      walletAddress: form.address,
    };
    dispatch(setUserWallet(data));
  };

  useEffect(() => {
    let timeout;
    if (setWalletSuccess) {
      timeout = setTimeout(() => {
        dispatch(resetWallet());
        window.location.reload();
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [setWalletSuccess, dispatch]);

  useEffect(() => {
    if (setWalletError) {
      setError(setWalletError);
    }
  }, [setWalletError]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        dispatch(resetWallet());
      }, 3000);
      //
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl capitalize font-bold">Wallet information</h3>
      <form action="" className="flex flex-col gap-5">
        <input
          onChange={handleInput}
          type="text"
          className="bg-slate-200 w-full py-2 px-4 outline-none font-bold "
          placeholder={user?.depositAddress || "Not set"}
          name="address"
          value={form.address}
        />
        <div>
          <button
            onClick={handleSubmit}
            className="py-2 font-medium bg-green-600 text-white capitalize rounded-3xl px-8"
          >
            {!setWalletLoading ? "update" : "wait..."}
          </button>
        </div>
      </form>
      {error && (
        <p className="text-red-500 capitalize font-medium text-xs">{error}!</p>
      )}
      {setWalletSuccess && (
        <p className="text-green-500 capitalize font-medium text-xs">
          {"Wallet updated."}
        </p>
      )}
    </div>
  );
};

export default Walletinfo;
