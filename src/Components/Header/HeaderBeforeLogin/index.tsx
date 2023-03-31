import { Link } from "react-router-dom";
import "./style.css";

export const HeaderBeforeLogin = () => {
  return (
    <div className="header">
      <Link to="/" className="header-logo">
        BlogReact
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
          to="/login"
          style={{
            textDecoration: "none",
            color: "#c2bbbb",
            padding: "0px 10px 0px 0px",
            fontWeight: "400",
          }}
        >
          Sign in
        </Link>
        <Link
          to="/register"
          style={{
            textDecoration: "none",
            color: "#c2bbbb",
            padding: "0px 10px 0px 0px",
            fontWeight: "400",
          }}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};
