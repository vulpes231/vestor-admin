/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdHome, MdWallet } from "react-icons/md";
import { FaBuyNLarge, FaUser } from "react-icons/fa";
import Landing from "./pages/Landing";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Trnxs from "./pages/Trnxs";
import Pools from "./pages/Pools";
import Users from "./pages/Users";
import { getAccessToken } from "./constants";
import { useSelector } from "react-redux";
import Userprofile from "./pages/Userprofile";

const authLinks = [
  {
    id: "dash",
    name: "dashboard",
    path: "/dashboard",
  },
  {
    id: "users",
    name: "users",
    path: "/users",
  },
  {
    id: "trnxs",
    name: "trnxs",
    path: "/trnxs",
  },
  {
    id: "pools",
    name: "pools",
    path: "/pools",
  },
];

const App = () => {
  const navigate = useNavigate();
  const permanentToken = getAccessToken();
  const [active, setActive] = useState("");
  const [token, setToken] = useState(false);

  const { accessToken } = useSelector((state) => state.auth);

  // console.log(permanentToken);

  useEffect(() => {
    if (accessToken || permanentToken) {
      setToken(accessToken ? accessToken : permanentToken);
    } else {
      setToken(false);
    }
  }, [accessToken, permanentToken]);

  useEffect(() => {
    if (!permanentToken) {
      navigate("/");
    }
  }, [permanentToken, navigate]);
  return (
    <div className="h-screen flex">
      <aside
        className={
          token
            ? `hidden md:flex h-screen flex-col bg-stone-900 text-slate-100 w-[350px] p-6 gap-6`
            : "hidden"
        }
      >
        <span className="w-full flex justify-between items-center">
          <h3 className="capitalize font-semibold text-2xl">Vestor Admin</h3>
        </span>
        <div className="flex flex-col gap-6">
          {authLinks.map((link) => {
            const icons =
              link.name === "dashboard" ? (
                <MdHome />
              ) : link.name === "users" ? (
                <FaUser />
              ) : link.name === "trnxs" ? (
                <FaBuyNLarge />
              ) : link.name === "pools" ? (
                <MdWallet />
              ) : null;
            return (
              <Link
                onClick={() => setActive(link.id)}
                className={`${
                  active === link.id ? "bg-white text-slate-800 p-2" : ""
                } capitalize font-medium flex gap-1 items-center`}
                key={link.id}
                to={link.path}
              >
                {icons}
                {link.name}
              </Link>
            );
          })}
        </div>
      </aside>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/dashboard"
            element={<Dashboard setActive={setActive} />}
          />
          <Route path="/users" element={<Users setActive={setActive} />} />
          <Route path="/pools" element={<Pools setActive={setActive} />} />
          <Route path="/trnxs" element={<Trnxs setActive={setActive} />} />
          <Route
            path="/userprofile/:userId"
            element={<Userprofile setActive={setActive} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
