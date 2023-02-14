import { Link } from "react-router-dom";
import { HeaderBeforeLogin } from "./HeaderBeforeLogin";
import { HeaderAfterLogin } from "./HeaderAfterLogin";
import { useSelector } from "react-redux";

export const Header = ({ children }: any) => {
  const token = localStorage.getItem("userToken");

  return (
    <div>
      {token ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
      {children}
    </div>
  );
};
