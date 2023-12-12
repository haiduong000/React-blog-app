import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Header } from "../../Components/Header";
import axios from "axios";
import { httpClient } from "../../api/httpClient";

export const PublishArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [commentList, setCommentList] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(true);
  const [isFavorite, setIsFavorite] = useState(true);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhMTIzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoic2ExMjMiLCJpYXQiOjE2NzIwMjYwMzcsImV4cCI6MTY3NzIxMDAzN30.9Wznov9SdW8FtxZuYDoFgOqPA4_Whrn-DvL89tfutl8";

  useEffect(() => {
    httpClient.get(`/articles/${slug}`).then((res) => {
      setArticle(res.data.article);
      setIsFollowing(res.data.article.author.following);
      setIsFavorite(res.data.article.favorited);
    });
  }, [slug]);

  useEffect(() => {
    httpClient.get(`/articles/${slug}/comments`).then((res) => {
      setCommentList(res.data.comments);
    });
  }, [commentList, slug]);

  const onSubmit = (values: any) => {
    if (values) {
      var data = JSON.stringify({
        comment: {
          body: "string",
        },
      });
      var config = {
        method: "post",
        url: `https://api.realworld.io/api/articles/${slug}/comments`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleFollow = () => {
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
              <h1 style={{ fontWeight: "normal" }}>{article?.slug}</h1>
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
                    <h2 style={{ paddingRight: "60px" }}>
                      {article.author.username}
                    </h2>
                  </Link>

                  <p>{`${new Date(article.createdAt).toDateString()}`}</p>
                </div>
                <button
                  onClick={handleFollow}
                  className="articles-header__info--follow"
                >
                  <i style={{ marginRight: "4px" }} className="fa fa-plus"></i>
                  {isFollowing ? "Unfollow" : "Follow"}
                  <p> {article.author.username}</p>
                </button>
                <button
                  onClick={hanldeFavorite}
                  className="articles-header__info--unfollow"
                >
                  <i style={{ marginRight: "4px" }} className="fa fa-heart"></i>
                  {isFavorite ? "Unfavorite" : "Favorite"}
                  <p> Articles</p>
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
                    <h2 style={{ paddingRight: "60px" }}>
                      {article.author.username}
                    </h2>
                  </Link>
                  <p>{`${new Date(article.createdAt).toDateString()}`}</p>
                </div>
                <button
                  onClick={handleFollow}
                  className="articles-footer__info--follow"
                >
                  <i style={{ marginRight: "4px" }} className="fa fa-heart"></i>
                  {isFollowing ? "Unfollow" : "Follow"}
                  <p> {article.author.username}</p>
                </button>
                <button
                  onClick={hanldeFavorite}
                  className="articles-footer__info--unfollow"
                >
                  <img src={article.image} alt="" />
                  <i style={{ marginRight: "4px" }} className="fa fa-heart"></i>
                  {isFavorite ? "Unfavorite" : "Favorite"}
                  <p> {article.author.username}</p>
                  <p> ({article.favoritesCount})</p>
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
                    rows={3}
                  />
                </Form.Group>
                <div className="articles-footer__comment--post">
                  <img src={user?.image} alt="" className="header-img" />
                  <button onClick={onSubmit}>Post Comment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
