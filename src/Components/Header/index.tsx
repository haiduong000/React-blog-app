import { HeaderBeforeLogin } from "./HeaderBeforeLogin";
import { HeaderAfterLogin } from "./HeaderAfterLogin";

export const Header = ({ children }: any) => {
  const token = localStorage.getItem("userToken");
  console.log(token);

  return (
    <div>
      {token ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
      {children}
    </div>
  );
};
