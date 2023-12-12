import React from "react";
import Form from "react-bootstrap/Form";
import { useEffect, useState, useContext } from "react";
import { httpClient } from "../../api/httpClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../../Components/Header";
import { ButtonFollowFavoried } from "../../Components/ButtonFollowFavorited";
import "./style.css";
import { AppContext } from "../../Components/GlobalContext";

export const ArticlesDetails = () => {
  const { slug } = useParams();
  const [commentList, setCommentList] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [comment, setComment] = useState<string>("");
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    article,
    setArticle,
    setIsFavorite,
    setIsFollowing,
    setCountFavorite,
  } = useContext(AppContext);

  useEffect(() => {
    httpClient.get(`/articles/${slug}`).then((res) => {
      setArticle(res.data.article);
      setIsFavorite(res.data.article.favorited);
      setIsFollowing(res.data.article.author.following);
      setCountFavorite(res.data.article.favoritesCount);
    });
  }, [slug]);

  useEffect(() => {
    try {
      httpClient
        .get(`/articles/${slug}/comments`)
        .then((res) => {
          setCommentList(res.data.comments);
        })
        .finally(() => {
          setComment("");
        });
    } catch (err) {
      setErrorMessage("Unable to delete comment");
    }
  }, [slug]);

  const deleteComment = (item: any) => {
    const id = item;
    httpClient.delete(`articles/${slug}/comments/${id}`).then((res) => {
      const remove = commentList.filter((item: any) => item.id !== id);
      setCommentList(remove);
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
    } else {
      httpClient
        .post(`/articles/${slug}/comments`, {
          comment: {
            body: comment,
          },
        })
        .then((res) => {
          setCommentList([...commentList, res.data.comment]);
          setComment("");
        });
    }
  };

  return (
    <>
      <Header />
      {article && (
        <div>
          <div className="articles">
            <div className="articles-header">
              <h1 style={{ textAlign: "justify", color: "#ccc" }}>
                {article?.slug.replaceAll("-", " ")}
              </h1>
              <div className="articles-header__info">
                <Link to={`/${article?.author.username}`}>
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                    }}
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
                  <p>{`${new Date(article.createdAt).toDateString()}`}</p>
                </div>
                <ButtonFollowFavoried />
              </div>
            </div>
            <div className="articles-body">
              <p style={{ textAlign: "justify" }}>
                {article.body.replaceAll(/\\n/g, " ")}
              </p>
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
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                    }}
                    src={article.author.image}
                    alt=""
                  />
                </Link>
                <div className="articles-footer__info--name">
                  <Link to={`/${article?.author.username}`}>
                    <h2 style={{ paddingRight: "60px" }}>
                      {article.author.username}
                    </h2>
                  </Link>
                  <p style={{ paddingRight: "46px" }}>{`${new Date(
                    article.createdAt
                  ).toDateString()}`}</p>
                </div>
                <ButtonFollowFavoried />
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
                  <img src={user?.userName} alt="" className="header-img" />
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
                            {`${new Date(article.createdAt).toDateString()}`}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteComment(comment.id)}
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
