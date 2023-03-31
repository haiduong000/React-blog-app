import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";
import { httpClient } from "../../api/httpClient";
import { Header } from "../../Components/Header";

export const GuestProfile = () => {
  const [articles, setArticles] = useState([]);
  const { username } = useParams();
  const [userLogin, setUserLogin] = useState<any>(null);
  const [tab, setTab] = useState("myarticle");

  const [user, setUser] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(true);

  const favoritedArticles = () => {
    setTab("setArticlesFavorited");
  };

  const MyArticles = () => {
    setTab("myarticle");
  };

  useEffect(() => {
    httpClient.get(`/user`).then((res) => {
      setUserLogin(res.data.user);
    });
  }, []);

  useEffect(() => {
    if (tab === "myarticle") {
      httpClient
        .get("/articles", {
          params: {
            author: username,
          },
        })
        .then((res) => {
          setArticles(res.data.articles);
        });
    } else if (tab === "setArticlesFavorited") {
      httpClient
        .get("/articles", {
          params: {
            favorited: username,
          },
        })
        .then((res) => {
          setArticles(res.data.articles);
        });
    }
  }, [tab]);

  useEffect(() => {
    httpClient.get(`/user`).then((res) => {
      setUserLogin(res.data.user);
    });
  }, []);

  useEffect(() => {
    httpClient
      .get(`/profiles/${username}`)
      .then(function (response) {
        setUser(response.data.profile);
        setIsFollowing(response.data.profile.following);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [username]);

  useEffect(() => {
    httpClient.get(`/articles?author=${username}`).then((res) => {
      setArticles(res.data.articles);
    });
  }, [username]);

  return (
    <>
      <Header />
      <div className="profile">
        <div className="profile-list">
          <img className="profile-list__img" src={user?.image} alt="" />
          <p className="profile-list__username">{user?.username}</p>
        </div>
      </div>
      <div className="articless">
        <div className="articles-main">
          <div className="articles-main__title">
            <Link
              className="articles-main__title-link"
              onClick={MyArticles}
              to={""}
            >
              My Article
            </Link>
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
                      <Link
                        className="articles-main__content-main-info-username"
                        to={""}
                      >
                        {article.author.username}
                      </Link>
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
