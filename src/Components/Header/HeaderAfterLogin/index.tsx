import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavLink from "react-bootstrap/esm/NavLink";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhMTIzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoic2ExMjMiLCJpYXQiOjE2NzIwMjYwMzcsImV4cCI6MTY3NzIxMDAzN30.9Wznov9SdW8FtxZuYDoFgOqPA4_Whrn-DvL89tfutl8";

export const HeaderAfterLogin = () => {
  const [userValue, setUserValue] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`https://api.realworld.io/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUserValue(res.data.user);
      });
  }, []);

  return (
    <div className="header">
      <Link to="/" className="header-logo">
        conduit
      </Link>
      <div className="header-method">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#c2bbbb",
            padding: "0px 10px 0px 0px",
            fontWeight: "400",
          }}
        >
          Home
        </Link>
        <Link
          to="/editor"
          style={{
            textDecoration: "none",
            color: "#c2bbbb",
            padding: "0px 10px 0px 0px",
            fontWeight: "400",
          }}
        >
          New Articles
        </Link>
        <Link
          to="/settings"
          style={{
            textDecoration: "none",
            color: "#c2bbbb",
            padding: "0px 10px 0px 0px",
            fontWeight: "400",
          }}
        >
          Settings
        </Link>
        <span>
          <Link
            to={`/${userValue?.username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <img src={userValue?.image} alt="" className="header-img" />
            <p style={{ display: "inline" }}>{userValue?.username}</p>
          </Link>
        </span>
      </div>
    </div>
  );
};
