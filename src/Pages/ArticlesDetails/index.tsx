import React from "react";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { httpClient } from "../../api/httpClient";
import { Link, useParams } from "react-router-dom";
import { Header } from "../../Components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import "./style.css";
import { error } from "console";

export const ArticlesDetails = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [commentList, setCommentList] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(true);
  const [isFavorite, setIsFavorite] = useState(true);
  const [comment, setComment] = useState("");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhMTIzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoic2ExMjMiLCJpYXQiOjE2NzIwMjYwMzcsImV4cCI6MTY3NzIxMDAzN30.9Wznov9SdW8FtxZuYDoFgOqPA4_Whrn-DvL89tfutl8";

  useEffect(() => {
    httpClient
      .get(`https://api.realworld.io/api/articles/${slug}`)
      .then((res) => {
        setArticle(res.data.article);
        setIsFollowing(res.data.article.author.following);
        setIsFavorite(res.data.article.favorited);
      });
  }, [slug]);

  const getComment = () => {
    httpClient
      .get(`https://api.realworld.io/api/articles/${slug}/comments`)
      .then((res) => {
        setCommentList(res.data.comments);
      })
      .finally(() => {
        console.log("run");
        setComment("");
      });
  };

  useEffect(() => {
    getComment();
  }, [slug]);

  const deleteComment = (item: any) => {
    const id = item.currentTarget.id;
    httpClient
      .delete(`articles/${slug}/comments/${id}`)
      .then(() => getComment());
  };

  const onSubmit = () => {
    httpClient
      .post(`https://api.realworld.io/api/articles/${slug}/comments`, {
        comment: {
          body: comment,
        },
      })
      .then((res) => {
        getComment();
      });
  };

  const hanldeFollow = () => {
    var config = {
      method: isFollowing ? "delete" : "post",
      url: `https://api.realworld.io/api/profiles/${article.author.username}/follow`,
      headers: {
        Authorization: `Bearer ${token} `,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setIsFollowing(!isFollowing);
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  const hanldeFavorite = () => {
    var config = {
      method: isFavorite ? "delete" : "post",
      url: `https://api.realworld.io/api/articles/${slug}/favorite`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setIsFavorite(!isFavorite);
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      {article && (
        <div>
          <div className="articles">
            <div className="articles-header">
              <h1>{article?.slug}</h1>
              <div className="articles-header__info">
                <Link to={`/${article?.author.username}`}>
                  <img
                    style={{ borderRadius: "50%" }}
                    src={article.author.image}
                    alt=""
                  />
                </Link>
                <div className="articles-header__info--name">
                  <Link to={`/${article?.author.username}`}>
                    <h2 style={{ paddingRight: "25px" }}>
                      {article.author.username}
                    </h2>
                  </Link>
                  <p>{article.createdAt}</p>
                </div>
                <button
                  onClick={hanldeFollow}
                  className="articles-header__info--follow"
                >
                  <i style={{ marginRight: "4px" }} className="fa fa-plus"></i>
                  {isFollowing ? "Unfollow" : "Follow"}
                  <p style={{ marginLeft: "4px" }}>
                    {" "}
                    {article.author.username}
                  </p>
                </button>
                <button
                  onClick={hanldeFavorite}
                  className="articles-header__info--unfollow"
                >
                  <i style={{ marginRight: "4px" }} className="fa fa-heart"></i>
                  {isFavorite ? "Unfavorite" : "Favorite"}
                  <p style={{ marginLeft: "3px" }}> Articles</p>
                  <p> ({article.favoritesCount})</p>
                </button>
              </div>
            </div>
            <div className="articles-body">
              <p>{article.body}</p>
              <div
                style={{
                  color: "#999",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "20px",
                }}
              >
                {article.tagList.map((tag: any, index: any) => (
                  <button className="articles-body_tags" key={index}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="articles-footer">
              <div className="articles-footer__info">
                <Link to={`/${article?.author.username}`}>
                  <img
                    style={{ borderRadius: "50%" }}
                    src={article.author.image}
                    alt=""
                  />
                </Link>
                <div className="articles-footer__info--name">
                  <Link to={`/${article?.author.username}`}>
                    <h2 style={{ paddingRight: "25px" }}>
                      {article.author.username}
                    </h2>
                  </Link>
                  <p>{article.createdAt}</p>
                </div>
                <button
                  onClick={hanldeFollow}
                  className="articles-footer__info--follow"
                >
                  <i style={{ marginRight: "4px" }} className="fa fa-heart"></i>
                  {isFollowing ? "Unfollow" : "Follow"}
                  <p style={{ marginLeft: "3px" }}>
                    {" "}
                    {article.author.username}
                  </p>
                </button>
                <button
                  onClick={hanldeFavorite}
                  className="articles-footer__info--unfollow"
                >
                  <img src={article.image} alt="" />
                  <i style={{ marginRight: "4px" }} className="fa fa-heart"></i>
                  {isFavorite ? "Unfavorite" : "Favorite"}
                  <p style={{ marginLeft: "3px" }}>
                    {" "}
                    {article.author.username}
                  </p>
                  <p style={{ marginLeft: "3px" }}>
                    {" "}
                    ({article.favoritesCount})
                  </p>
                </button>
              </div>
              <div className="articles-footer__comment">
                <Form.Group
                  className="articles-footer__comment--input mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    className="articles-footer__comment--input--form"
                    placeholder="Write a comment..."
                    as="textarea"
                    value={comment}
                    rows={3}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
                <div className="articles-footer__comment--post">
                  <img src={user?.image} alt="" className="header-img" />
                  <button onClick={onSubmit}>Post Comment</button>
                </div>
                {commentList?.length > 0 &&
                  commentList.map((comment: any, index: any) => (
                    <div id={comment.id} key={index} className="comment-list">
                      <p className="comment-body">{comment.body}</p>
                      <div className="comment-user">
                        <div className="comment-time">
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/${article?.author.username}`}
                          >
                            <img
                              className="comment-img"
                              style={{ borderRadius: "50%" }}
                              src={comment?.author?.image}
                              alt=""
                            />
                          </Link>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/${article?.author.username}`}
                          >
                            {comment?.author?.username}
                          </Link>
                          <span className="comment-time">
                            {article.createdAt}
                          </span>
                        </div>
                        <button
                          id={comment.id}
                          onClick={deleteComment}
                          className="comment-delete"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
