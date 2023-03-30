import { HomeBeforeLogin } from "./HomeBeforeLogin";
import { HomeAfterLogin } from "./HomeAfterLogin";

export const Home = ({ children }: any) => {
  const token = localStorage.getItem("userToken");

  return (
    <div>
      {token ? <HomeAfterLogin /> : <HomeBeforeLogin />}
      {children}
    </div>
  );
};
