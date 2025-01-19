/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { styles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getInvestments } from "../features/poolSlice";

const headers = [
  {
    id: "gateway",
    name: "From",
  },
  {
    id: "amount",
    name: "Amount",
  },
  {
    id: "network",
    name: "Plan",
  },
  {
    id: "status",
    name: "Status",
  },
  {
    id: "actions",
    name: "Actions",
  },
];

const Pools = ({ setActive }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const { pools, getPoolError } = useSelector((state) => state.invest);
  const accessToken = getAccessToken();

  const handleAction = (action, poolId) => {
    console.log(`Action: ${action}, Pool ID: ${poolId}`);
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
      status: pool.status ? "Active" : "Inactive",
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
        <h3 className={styles.title}>Pools</h3>
        <Datatable headers={headers} data={modifiedPools} rowKey="_id" />
      </div>
    </section>
  );
};

export default Pools;
