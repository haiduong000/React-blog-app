import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { httpClient } from "../../../api/httpClient";

export const HeaderAfterLogin = () => {
  const [userValue, setUserValue] = useState<any>(null);

  useEffect(() => {
    httpClient.get(`/user`).then((res) => {
      setUserValue(res.data.user);
    });
  }, []);

  return (
    <div className="header">
      <Link to="/" className="header-logo">
        BlogReact
      </Link>
      <div className="header-method">
        <i
          style={{ paddingTop: "10px", paddingRight: "2px" }}
          className="fa-solid fa-house"
        ></i>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#c2bbbb",
            padding: "0px 10px 0px 0px",
            fontWeight: "400",
            marginTop: "8px",
          }}
        >
          Home
        </Link>
        <i
          style={{ paddingTop: "10px", paddingRight: "2px" }}
          className="fa-solid fa-circle-plus"
        ></i>
        <Link
          to="/new-articles"
          style={{
            textDecoration: "none",
            color: "#c2bbbb",
            padding: "0px 10px 0px 0px",
            fontWeight: "400",
            marginTop: "8px",
          }}
        >
          New Articles
        </Link>
        <i
          style={{ paddingTop: "10px", paddingRight: "2px" }}
          className="fa-solid fa-gear"
        ></i>
        <Link
          to="/settings"
          style={{
            textDecoration: "none",
            color: "#c2bbbb",
            padding: "0px 10px 0px 0px",
            fontWeight: "400",
            marginTop: "8px",
          }}
        >
          Settings
        </Link>
        <div>
          <Link
            to={`/${userValue?.username}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <img
              src={
                "https://images.pexels.com/photos/1123829/pexels-photo-1123829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt=""
              className="header-img"
            />
            <p style={{ display: "inline" }}>{userValue?.username}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
