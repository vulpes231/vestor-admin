/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { styles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getInvestments } from "../features/poolSlice";
import { Link, useNavigate } from "react-router-dom";

const headers = [
  {
    id: "_id",
    name: "Trade ID",
  },
  {
    id: "amount",
    name: "Amount",
  },
  {
    id: "market",
    name: "Asset",
  },
  {
    id: "status",
    name: "Status",
  },
  {
    id: "roi",
    name: "roi",
  },
  {
    id: "actions",
    name: "Actions",
  },
];

const Pools = ({ setActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const { pools, getPoolError } = useSelector((state) => state.invest);
  const accessToken = getAccessToken();

  // console.log(pools);

  const handleAction = (action, poolId) => {
    if (action && poolId) {
      if (action === "edit") {
        navigate(`/edit-trade/${poolId}`);
      } else {
        console.log(`Action: ${action}, Pool ID: ${poolId}`);
      }
    }
  };

  const modifiedPools =
    pools &&
    pools.map((pool) => ({
      ...pool,
      actions: (
        <select
          onChange={(e) => handleAction(e.target.value, pool._id)}
          className="p-2 border rounded"
        >
          <option value="">Select action</option>
          <option value="edit">Edit</option>
          <option value="delete">Delete</option>
        </select>
      ),
      status: pool.status,
    }));

  useEffect(() => {
    if (getPoolError) {
      setError(getPoolError);
    }
  }, [getPoolError]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getInvestments());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    setActive("pools");
  }, [setActive]);

  // useEffect(() => {
  //   if (error.includes("Bad token")) {
  //     sessionStorage.clear();
  //     setError("");
  //     window.location.href = "/";
  //   }
  // }, [error]);

  if (getPoolError) {
    return <p>Failed to load Investments. Try again</p>;
  }

  return (
    <section className={`${styles.authWrapper} p-6`}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center ">
          <h3 className={styles.title}>Pools</h3>
          <Link
            to={"/create-trade"}
            className="w-[120px] h-[38px] flex items-center justify-center bg-green-600 text-[#fff] font-medium capitalize rounded-[5px]"
          >
            create trade
          </Link>
        </div>
        <Datatable headers={headers} data={modifiedPools} rowKey="_id" />
      </div>
    </section>
  );
};

export default Pools;
