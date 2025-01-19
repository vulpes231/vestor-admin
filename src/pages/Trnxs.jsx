/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Datatable from "../components/Datatable";
import { styles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getAllTrnx } from "../features/trnxSlice";
import Approvemodal from "../components/Approvemodal";

const headers = [
  {
    id: "email",
    name: "Email",
  },
  {
    id: "coin",
    name: "Coin",
  },
  {
    id: "type",
    name: "Type",
  },
  {
    id: "amount",
    name: "amount",
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

const Trnxs = ({ setActive }) => {
  const dispatch = useDispatch();
  const { trnxs, getTrnxError } = useSelector((state) => state.trnx);
  const accessToken = getAccessToken();

  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [transactionId, setTransactionId] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllTrnx());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    setActive("trnxs");
  }, [setActive]);

  useEffect(() => {
    if (getTrnxError) {
      setError(getTrnxError);
    }
  }, [getTrnxError]);

  useEffect(() => {
    if (error && error.includes("Bad token")) {
      sessionStorage.clear();
      setError("");
      window.location.href = "/";
    }
  }, [error]);

  const handleAction = (action, transactionId, currentStatus) => {
    setTransactionId(transactionId);
    setStatus(currentStatus);
    if (action === "approve") {
      setApproveModal(true);
    }
    if (action === "reject") {
      setRejectModal(true);
    }
  };
  const closeModal = () => {
    setTransactionId(false);
    setApproveModal(false);
    setStatus(false);
  };

  const modifiedTransactions =
    trnxs &&
    trnxs.map((transaction) => ({
      ...transaction,
      actions: (
        <select
          onChange={(e) =>
            handleAction(e.target.value, transaction._id, transaction.status)
          }
          className={` p-2 border rounded`}
          disabled={transaction.status === "completed"}
        >
          <option value="">Select action</option>
          <option value="approve">Approve</option>
          {/* <option value="reject">Reject</option> */}
        </select>
      ),
      status: transaction.status,
    }));

  if (getTrnxError) {
    return <p className="p-6">Failed to load Transactions. Try again</p>;
  }

  return (
    <section className={`${styles.authWrapper} p-6`}>
      <div className="flex flex-col gap-6">
        <h3 className={styles.title}>Transactions</h3>
        <Datatable headers={headers} data={modifiedTransactions} rowKey="_id" />
      </div>
      {approveModal && (
        <Approvemodal
          trnxId={transactionId}
          close={closeModal}
          status={status}
          setStatus={setStatus}
        />
      )}
    </section>
  );
};

export default Trnxs;
