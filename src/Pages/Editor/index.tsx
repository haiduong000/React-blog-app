import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { httpClient } from "../../api/httpClient";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { Header } from "../../Components/Header";

export const Editor = () => {
  const [title, setTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [mainBody, setMainBody] = useState("");
  const [tagList, setTagList] = useState<any[]>([]);
  const [tags, setTags] = useState("");

  const navigate = useNavigate();

  const handleRemove = (index: number) => {
    const remove = tagList.filter((_, item: any) => item !== index);
    console.log(remove);
    setTagList(remove);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    httpClient
      .post("/articles", {
        article: {
          title: title,
          description: heading,
          body: mainBody,
          tagList: tagList,
        },
      })
      .then((res: any) => {
        if (res.status === 200) {
          console.log(res.data);
          setTitle("");
          setHeading("");
          setMainBody("");
          setTagList([]);
          setTags("");
          navigate("/");
        }
      });
  };
  return (
    <>
      <Header />
      <Form className="form" onSubmit={handleSubmit}>
        <InputGroup size="lg">
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Article Title"
            className="form-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputGroup>
        <InputGroup size="lg">
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="What's this article about?"
            className="form-about"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              placeholder="Write your article (in markdown)"
              as="textarea"
              rows={3}
              className="form-description"
              value={mainBody}
              onChange={(e) => setMainBody(e.target.value)}
            />
          </Form.Group>
        </InputGroup>
        <InputGroup size="lg">
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Enter tags"
            className="form-tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </InputGroup>
        <div>
          {tagList.map((item: any, index: number) => (
            <span className="tags" key={index}>
              <span onClick={() => handleRemove(index)}>x</span>
              {item}
            </span>
          ))}
        </div>
        <Button
          onClick={handleSubmit}
          className="btn-publish"
          variant="secondary"
          size="lg"
          active
        >
          Publish Article
        </Button>
      </Form>
    </>
  );
};
