import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { HeaderAfterLogin } from "../../Components/Header/HeaderAfterLogin";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
import { httpClient } from "../../api/httpClient";
import { Button } from "react-bootstrap";
import { Header } from "../../Components/Header";

export const GuestProfile = () => {
  const [articles, setArticles] = useState([]);
  const { username } = useParams();
  const [userLogin, setUserLogin] = useState<any>(null);
  const [tab, setTab] = useState("myarticle");
  const [commentList, setCommentList] = useState<any>([]);
  const [comment, setComment] = useState<any>("");
  const [follow, setFollow] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(true);
  const tokenLogin = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhMTIzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoic2ExMjMiLCJpYXQiOjE2NzIwMjYwMzcsImV4cCI6MTY3NzIxMDAzN30.9Wznov9SdW8FtxZuYDoFgOqPA4_Whrn-DvL89tfutl8";
  const favoritedArticles = () => {
    setTab("setArticlesFavorited");
  };

  useEffect(() => {
    axios
      .get(`https://api.realworld.io/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUserLogin(res.data.user);
      });
  }, []);
  console.log(user);
  useEffect(() => {
    if (tab === "myarticle") {
      axios
        .get(`https://api.realworld.io/api/articles?author=${username}`)
        .then((res) => {
          setArticles(res.data.articles);
        });
    } else {
      axios
        .get(`https://api.realworld.io/api/articles?favorited=${username}`)
        .then((res) => {
          setArticles(res.data.articles);
        });
    }
  }, [tab]);

  useEffect(() => {
    axios
      .get(`https://api.realworld.io/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUserLogin(res.data.user);
      });
  }, []);

  const handleFollow = () => {
    if (!tokenLogin) {
      navigate("/login");
    }
    var config = {
      method: isFollowing ? "delete" : "post",
      url: `https://api.realworld.io/api/profiles/${username}/follow`,
      headers: {
        Authorization: `Bearer ${token} `,
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
  useEffect(() => {
    var config = {
      method: "get",
      url: `https://api.realworld.io/api/profiles/${username}`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhMTIzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoic2ExMjMiLCJpYXQiOjE2NzIwMjYwMzcsImV4cCI6MTY3NzIxMDAzN30.9Wznov9SdW8FtxZuYDoFgOqPA4_Whrn-DvL89tfutl8",
      },
    };
    axios(config)
      .then(function (response) {
        setUser(response.data.profile);
        setIsFollowing(response.data.profile.following);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [username]);

  useEffect(() => {
    httpClient
      .get(`https://api.realworld.io/api/articles?author=${username}`)
      .then((res) => {
        setArticles(res.data.articles);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile-list">
          <img className="profile-list__img" src={user?.image} alt="" />
          <p className="profile-list__username">{user?.username}</p>
        </div>
        <div className="profile-list__btn">
          {username === userLogin?.username ? (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/settings"
            >
              <p style={{ margin: "unset" }}>Edit Profile Settings</p>
            </Link>
          ) : (
            <p style={{ margin: "unset" }} onClick={handleFollow}>
              <i className="fas fa-plus"></i> <span> </span>
              {isFollowing ? "Unfollow" : "Follow"} <span> </span>
              {user?.username}
            </p>
          )}
        </div>
      </div>
      <div className="articless">
        <div className="articles-main">
          <div className="articles-main__title">
            <a className="articles-main__title-link" href="/myarticle">
              My Article
            </a>
            <p
              className="articles-main__title-favorited"
              onClick={favoritedArticles}
            >
              Favorited Articles
            </p>
          </div>
          {articles.length > 0 &&
            articles.map((article: any, index) => (
              <div className="articles-main__content" key={index}>
                <div className="articles-main__content-main">
                  <div className="articles-main__content-main-info">
                    <img
                      className="articles-main__content-main-info-img"
                      src={article.author.image}
                      alt=""
                    />
                    <div>
                      <a
                        className="articles-main__content-main-info-username"
                        href=""
                      >
                        {article.author.username}
                      </a>
                      <p className="articles-main__content-main-info-time">
                        {article.createdAt}
                      </p>
                    </div>
                  </div>
                  <button className="articles-main__content-main-btn">
                    <i className="articles-main__content-main-btn-logo fas fa-heart"></i>
                    <span>{article.favoritesCount}</span>
                  </button>
                </div>
                <div>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/articles/${article.slug}`}
                  >
                    <h1 className="articles-main__content-title">
                      {article.title}
                    </h1>
                    <p className="articles-main__content-description">
                      {article.description}
                    </p>
                  </Link>
                </div>
                <p className="articles-main__content-footer">
                  <Link
                    to={`/articles/${article.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "#ccc",
                      fontWeight: "300",
                    }}
                  >
                    Read more...
                  </Link>
                  <Link
                    to={`/articles/${article.slug}`}
                    style={{ color: "#999" }}
                  >
                    {article.tagList.map((tag: any, index: any) => (
                      <button
                        className="articles-main__content-read-btn"
                        key={index}
                      >
                        {tag}
                      </button>
                    ))}
                  </Link>
                </p>
              </div>
            ))}
        </div>
      </div>
      <div style={{ margin: "35px 250px" }} aria-label="..."></div>
    </>
  );
};
