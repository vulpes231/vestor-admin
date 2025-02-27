/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../features/loginSlice";
import { useNavigate } from "react-router-dom";
import { styles } from "../constants/styles";

const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { loginLoading, loginError, accessToken, username } = useSelector(
    (state) => state.auth
  );

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.username) {
      setError("Username is required!");
      return;
    }
    console.log(form);
    dispatch(auth(form));
  };

  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("admin", username);
      navigate("/dashboard");
    }
  }, [accessToken, navigate, username]);

  return (
    <section className={`${styles.wrapper} flex items-center justify-center`}>
      <div className="bg-stone-800 md:w-[400px] md:mx-auto p-6 flex flex-col gap-6 shadow-md rounded-lg text-slate-100 border border-stone-600">
        <h3 className="uppercase font-semibold">admin login</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className={styles.inputHolder}>
            <label className={styles.label} htmlFor="">
              username
            </label>
            <input
              type="text"
              className={styles.input}
              value={form.username}
              onChange={handleInput}
              name="username"
              autoComplete="off"
            />
          </div>
          <div className={styles.inputHolder}>
            <label className={styles.label} htmlFor="">
              password
            </label>
            <input
              type="password"
              className={styles.input}
              value={form.password}
              onChange={handleInput}
              name="password"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className={`${styles.button} rounded-3xl shadow-md`}
          >
            {!loginLoading ? "login" : "wait..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Landing;
