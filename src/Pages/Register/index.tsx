import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { HeaderBeforeLogin } from "../../Components/Header/HeaderBeforeLogin";
import { useDispatch } from "react-redux";
import { httpClient } from "../../api/httpClient";
import { setUser } from "../../Components/Store";
import "./style.css";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [emailHandle, setEmailHandle] = useState("");
  const [passwordHandle, setPasswordHandle] = useState("");
  const [errorHandle, setErrorHandle] = useState("");
  const [handleLove, setHandleLove] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmitRegister = (e: any) => {
    e.preventDefault();
    try {
      httpClient
        .post("/users", {
          user: {
            email: emailHandle,
            password: passwordHandle,
          },
        })
        .then((res: any) => {
          if (res.status === 200) {
            dispatch(setUser({ ...res.data.user }));
            localStorage.setItem("userToken", res.data.user.token);
            navigate("/login");
            setEmailHandle("");
            setPasswordHandle("");
            setErrorHandle("");
          }
          if (res.status !== 200) {
            setErrorHandle("Error");
            alert("Has an error");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HeaderBeforeLogin />
      <div className="logout">
        <h1>Sign Up</h1>
        <Link className="account-name" to="/login">
          Have an account?
        </Link>
        <p>{errorHandle}</p>
        <Form onSubmit={handleSubmitRegister}>
          <InputGroup size="lg" style={{ marginBottom: "14px" }}>
            <Form.Control
              aria-label="Large"
              type="username"
              onChange={(e) => setEmailHandle(e.target.value)}
              aria-describedby="inputGroup-sizing-sm"
              style={{
                width: "500px",
                height: "40px",
                paddingLeft: "15px",
                fontSize: "18px",
              }}
              placeholder="Username"
            />
          </InputGroup>
          <InputGroup size="lg">
            <Form.Control
              aria-label="Large"
              type="email"
              onChange={(e) => setEmailHandle(e.target.value)}
              aria-describedby="inputGroup-sizing-sm"
              style={{
                width: "500px",
                height: "40px",
                paddingLeft: "15px",
                fontSize: "18px",
              }}
              placeholder="Email"
            />
          </InputGroup>
          <InputGroup size="lg" style={{ margin: "14px 0px" }}>
            <Form.Control
              aria-label="Large"
              type="password"
              value={passwordHandle}
              onChange={(e) => setPasswordHandle(e.target.value)}
              aria-describedby="inputGroup-sizing-sm"
              style={{
                width: "500px",
                height: "40px",
                paddingLeft: "15px",
                fontSize: "18px",
              }}
              placeholder="Password"
            />
          </InputGroup>
        </Form>
        <Button className="button-login" variant="secondary" size="lg" active>
          Sign Up
        </Button>
      </div>
    </>
  );
};
