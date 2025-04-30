/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetWallet, setUserWallet } from "../features/userSlice";

const style = {
  label: "text-[13px] lg:text-[14px] text-[#979797] font-normal capitalize",
  input:
    "text-[16px] h-[40px] border border-[#979797] rounded-[5px] bg-white bg-[#979797]/3 w-full p-2 outline-none",
  select:
    "text-[16px] h-[40px] border border-[#979797] rounded-[5px] bg-white w-full p-2 outline-none",
};

const methods = [
  {
    id: "bank",
    name: "bank",
  },
  {
    id: "crypto",
    name: "crypto",
  },
];

const Walletinfo = ({ user }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    address: "",
    coin: "",
    bankName: "",
    account: "",
    routing: "",
    bankAddress: "",
    userId: "",
    method: "",
  });
  const [error, setError] = useState("");
  const [method, setMethod] = useState("bank");

  const { setWalletLoading, setWalletError, setWalletSuccess } = useSelector(
    (state) => state.users
  );

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData;
    if (method === "bank") {
      formData = {
        bankName: form.bankName,
        account: form.account,
        routing: form.routing,
        bankAddress: form.bankAddress,
        userId: user._id,
        method: method,
      };
    } else {
      formData = {
        address: form.address,
        coin: form.coin,
        userId: user._id,
        method: method,
      };
    }

    console.log(formData);

    dispatch(setUserWallet(formData));
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
      <div className="flex items-center gap-10">
        {methods.map((mtd) => {
          return (
            <button
              className={`${
                method === mtd.id
                  ? "bg-green-800 text-white font-bold"
                  : "border-[1px] border-green-600 text-green-700 font-thin"
              } h-[40px] w-[89px] rounded-[5px] text-[14px] capitalize`}
              onClick={() => setMethod(mtd.id)}
              key={mtd.id}
            >
              {mtd.name}
            </button>
          );
        })}
      </div>
      <form action="" className="flex flex-col gap-5">
        {method === "crypto" ? (
          <div>
            <div>
              <label className={style.label} htmlFor="">
                coin
              </label>
              <select
                onChange={handleInput}
                className={style.select}
                name="coin"
                value={form.coin}
              >
                <option value="">Choose coin</option>
                <option value="btc">btc</option>
                <option value="ethErc">eth (ERC20)</option>
                <option value="ethArb">eth (ARBITRUM)</option>
                <option value="usdtErc">usdt (ERC20)</option>
                <option value="usdtTrc">usdt (TRC20)</option>
              </select>
            </div>

            <div>
              <label className={style.label} htmlFor="">
                address
              </label>
              <input
                onChange={handleInput}
                type="text"
                className={style.input}
                // placeholder={user?.depositAddress || "Not set"}
                name="address"
                value={form.address}
              />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <label className={style.label} htmlFor="">
                bank name
              </label>
              <input
                onChange={handleInput}
                type="text"
                className={style.input}
                // placeholder={user?.depositAddress || "Not set"}
                name="bankName"
                value={form.bankName}
              />
            </div>

            <div>
              <label className={style.label} htmlFor="">
                account number
              </label>
              <input
                onChange={handleInput}
                type="text"
                className={style.input}
                // placeholder={user?.depositAddress || "Not set"}
                name="account"
                value={form.account}
              />
            </div>
            <div>
              <label className={style.label} htmlFor="">
                routing number
              </label>
              <input
                onChange={handleInput}
                type="text"
                className={style.input}
                // placeholder={user?.depositAddress || "Not set"}
                name="routing"
                value={form.routing}
              />
            </div>
            <div>
              <label className={style.label} htmlFor="">
                bank address
              </label>
              <input
                onChange={handleInput}
                type="text"
                className={style.input}
                // placeholder={user?.depositAddress || "Not set"}
                name="bankAddress"
                value={form.bankAddress}
              />
            </div>
          </div>
        )}
        <div>
          <button
            onClick={handleSubmit}
            className="font-medium bg-sky-600 text-white capitalize h-[40px] p-2 rounded-[5px] w-[120px]"
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
