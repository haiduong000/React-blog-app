import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { httpClient } from "../../api/httpClient";
import { HeaderBeforeLogin } from "../../Components/Header/HeaderBeforeLogin";
import { setUser } from "../../Components/Store";
import "./style.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      httpClient
        .post("/users/login", {
          user: {
            email: email,
            password: password,
          },
        })
        .then((res: any) => {
          if (res.status === 200) {
            dispatch(setUser({ ...res.data.user }));
            localStorage.setItem("userToken", res.data.user.token);
            navigate("/");
            setEmail("");
            setPassword("");
            setError("");
          }
          if (res.status !== 200) {
            setError("Error");
            alert("Error");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HeaderBeforeLogin />
      <div className="login">
        <div className="form-header">
          <h1>Sign In</h1>
          <Link to="/register" className="account-name">
            You Need An Account?
          </Link>
        </div>
        <p>{error}</p>
        <div className="form-center">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{ width: "600px", height: "40px", marginBottom: "20px" }}
              />
              {/* <Form.Text className="text-muted">Error</Form.Text> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{ width: "600px", height: "40px", marginBottom: "20px" }}
              />
            </Form.Group>

            <Button
              className="button-login_main"
              variant="success"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
