import React, { useEffect, useState } from "react";
import { HeaderAfterLogin } from "../../Components/Header/HeaderAfterLogin";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style.css";
import { httpClient } from "../../api/httpClient";
import { useDispatch } from "react-redux";

export const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState<any>([]);
  const [img, setImg] = useState(currentUser.image);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSetting = (e: any) => {
  //   e.preventDefault();
  //   try {
  //     httpClient.put("/user", {
  //       user
  //     })
  //   }
  // };

  const logout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };
  return (
    <>
      <HeaderAfterLogin />
      <div className="form-setting">
        <h1>Your Settings</h1>
        <InputGroup size="lg">
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="URL or profile picture"
            className="form-setting-url"
          />
        </InputGroup>
        <InputGroup size="lg">
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Username"
            className="form-setting-username"
          />
        </InputGroup>
        <InputGroup>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              placeholder="Short bio about you"
              as="textarea"
              rows={3}
              className="form-setting-bio"
            />
          </Form.Group>
        </InputGroup>
        <InputGroup size="lg">
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Email"
            className="form-setting-email"
          />
        </InputGroup>
        <InputGroup size="lg">
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="New Password"
            className="form-setting-password"
          />
        </InputGroup>
        <div>
          <Button
            className="button-setting"
            variant="secondary"
            size="lg"
            active
          >
            Update Settings
          </Button>
          <Button className="btn-logout" onClick={logout}>
            Or click here to logout.
          </Button>
        </div>
      </div>
    </>
  );
};
