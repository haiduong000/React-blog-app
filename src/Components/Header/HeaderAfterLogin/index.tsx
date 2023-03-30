import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { httpClient } from "../../../api/httpClient";

export const HeaderAfterLogin = () => {
  const [userValue, setUserValue] = useState<any>(null);

  useEffect(() => {
    httpClient.get(`/user`).then((res) => {
      setUserValue(res.data.user);
      console.log(res);
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
