import { Link } from "react-router-dom";
import { HomeBeforeLogin } from "./HomeBeforeLogin";
import { HomeAfterLogin } from "./HomeAfterLogin";
import { useSelector } from "react-redux";

export const Home = ({ children }: any) => {
  const token = localStorage.getItem("userToken");
  const userlogin = useSelector((state: any) => state.user.user);

  return (
    <div>
      {token ? <HomeAfterLogin /> : <HomeBeforeLogin />}
      {children}
    </div>
  );
};
