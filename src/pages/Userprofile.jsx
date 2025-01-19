/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../features/userSlice";
import { styles } from "../constants/styles";

import { MdMail, MdSupportAgent } from "react-icons/md";
import { getVerifyInfo, verifyUser } from "../features/verifySlice";

const PersonalInfo = ({ user }) => {
  return (
    <div>
      <form action="">
        <div className="flex flex-col md:flex-row gap-4">
          <div className={styles.inputHolder}>
            <label className={styles.label} htmlFor="">
              First Name
            </label>
            <input
              type="text"
              readOnly
              value={user?.firstname}
              className={styles.input}
            />
          </div>
          <div className={styles.inputHolder}>
            <label className={styles.label} htmlFor="">
              Last Name
            </label>
            <input
              type="text"
              readOnly
              value={user?.lastname}
              className={styles.input}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className={styles.inputHolder}>
            <label className={styles.label} htmlFor="">
              Username
            </label>
            <input
              type="text"
              readOnly
              value={user?.username}
              className={styles.input}
            />
          </div>
          <div className={styles.inputHolder}>
            <label className={styles.label} htmlFor="">
              Email
            </label>
            <input
              type="text"
              readOnly
              value={user?.email}
              className={styles.input}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const ContactInfo = ({ user }) => {
  return (
    <div>
      <form action="">
        <div className="flex flex-col md:flex-row  gap-4">
          <div className={styles.inputHolder}>
            <label className={styles.label} htmlFor="">
              Phone
            </label>
            <input
              type="text"
              readOnly
              value={user?.phone}
              className={styles.input}
            />
          </div>
          <div className={styles.inputHolder}>
            <label className={styles.label} htmlFor="">
              Country
            </label>
            <input
              type="text"
              readOnly
              value={user?.country}
              className={styles.input}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className={styles.inputHolder}>
            <label className={styles.label} htmlFor="">
              City
            </label>
            <input
              type="text"
              readOnly
              value={user?.city}
              className={styles.input}
            />
          </div>
          <div className={styles.inputHolder}>
            <label className={styles.label} htmlFor="">
              State
            </label>
            <input
              type="text"
              readOnly
              value={user?.state}
              className={styles.input}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const Verifications = ({ user }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center ">
        <label className={`${styles.label} flex gap-1 items-center`} htmlFor="">
          <MdSupportAgent />
          KYC Verified
        </label>
        <span>{user?.isKycVerified ? "Yes" : "No"}</span>
      </div>
      <div className="flex justify-between items-center">
        <label className={`${styles.label} flex gap-1 items-center`} htmlFor="">
          <MdMail /> Email Verified
        </label>
        <span>{user?.isEmailVerified ? "Yes" : "No"}</span>
      </div>
    </div>
  );
};

const Verification = ({ user }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const { verifyInfo, verifyUserLoading, verifyUserError, userVerified } =
    useSelector((state) => state.verify);

  const handleVerify = (e) => {
    e.preventDefault();
    dispatch(verifyUser(user._id));
  };

  useEffect(() => {
    if (verifyUserError) {
      setError(verifyUserError);
    }
  }, [verifyUserError]);

  useEffect(() => {
    if (userVerified) {
      window.location.reload();
    }
  }, [userVerified]);

  useEffect(() => {
    if (user.documentSubmitted) {
      dispatch(getVerifyInfo(user._id));
    }
  }, [user, dispatch]);
  return (
    <div className="flex flex-col gap-6">
      <h3
        className="bg-slate-200 p-2 cursor-pointer"
        onClick={() => setShow((prev) => !prev)}
      >
        Verification Documents
      </h3>
      <div className={`${show ? "flex" : "hidden"}`}>
        {user.documentSubmitted ? (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center overflow-auto">
              <p>{verifyInfo?.fullname}</p>
              <p>{verifyInfo?.gender}</p>
              <p>{verifyInfo?.occupation}</p>
              <p>{verifyInfo?.image}</p>
              <p>{verifyInfo?.status}</p>
            </div>
            <button
              onClick={handleVerify}
              className="w-full p-2 rounded-3xl bg-green-600 text-white text-sm my-5"
            >
              {!verifyUserLoading ? " Verify User" : "Wait..."}
            </button>
          </div>
        ) : (
          <p className="text-xs font-light px-10">No documents submitted.</p>
        )}
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};

const Userprofile = ({ setActive }) => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const accessToken = getAccessToken();

  const { userInfo } = useSelector((state) => state.users);

  useEffect(() => {
    setActive("users");
  }, [setActive]);

  useEffect(() => {
    if (accessToken && userId) {
      dispatch(getUserInfo(userId));
    }
  }, [accessToken, userId, dispatch]);
  return (
    <section className={`${styles.authWrapper} p-6 overflow-auto`}>
      <div className="w-full lg:w-[600px] lg:mx-auto  p-6 flex flex-col gap-6">
        <h3 className={styles.title}>User Profile</h3>
        <div className="flex flex-col gap-6 bg-white p-10">
          <PersonalInfo user={userInfo} />
          <ContactInfo user={userInfo} />
          <Verifications user={userInfo} />
          <Verification user={userInfo} />
        </div>
      </div>
    </section>
  );
};

export default Userprofile;
