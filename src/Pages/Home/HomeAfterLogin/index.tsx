import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../../Components/Header";
import Pagination from "../../Pagination";
import { httpClient } from "../../../api/httpClient";
import "./style.css";

export const HomeAfterLogin = () => {
  const [tags, setTags] = useState<any>([]);
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [tagList, setTagList] = useState<any>("");
  const [feed, setFeed] = useState<any>("yourfeed");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const allFeed = () => {
    setFeed("allFeed");
  };
  const yourfeed = () => {
    setFeed("yourfeed");
  };

  // pagination
  useEffect(() => {
    const fetchArtices = async () => {
      setLoading(true);
      const res = await httpClient.get(
        "https://api.realworld.io/api/articles?limit=100&offset=0"
      );
      setArticles(res.data.articles);
      setLoading(false);
    };
    fetchArtices();
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    if (feed === "yourfeed") {
      httpClient
        .get("/articles/feed", {
          params: {
            limit: 100,
            offset: 0,
          },
        })
        .then(function (response) {
          setArticles(response.data.articles);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (feed === "allFeed") {
      httpClient
        .get("/articles", {
          params: {
            limit: 200,
            offset: 0,
          },
        })
        .then(function (response) {
          setArticles(response.data.articles);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [feed]);

  useEffect(() => {
    axios.get(`https://api.realworld.io/api/tags`).then((res) => {
      setTags(res.data.tags);
    });
  }, []);
  const handleClick = (tagName: any) => {
    setTagList(tagName);
    axios
      .get("https://conduit.productionready.io/api/articles", {
        params: {
          tag: tagName,
        },
      })
      .then((res: any) => setArticles(res.data.articles));
  };

  const setAddCount = () => {
    setCount(() => count + 1);
  };
  // Change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div className="home-title">
        <h1>BlogReact</h1>
        <p>A place to share your knowledge</p>
      </div>
      <div className="home-main">
        <div className="home-main__global">
          <div className="home-main__global-feed">
            <button onClick={yourfeed}>Your Feed</button>
            <button onClick={allFeed}>Global Feed</button>
            <p style={{ margin: "unset", paddingTop: "5px" }}>
              {tagList ? tagList : ""}
            </p>
          </div>
          {currentPosts.length > 0 &&
            currentPosts.map((article: any, index: any) => (
              <div className="home-content" key={index}>
                <div className="home-content__header">
                  <div className="home-content__header-info">
                    <img
                      style={{
                        borderRadius: "50%",
                        marginRight: "10px",
                        width: "32px",
                        height: "32px",
                      }}
                      src={article.author.image}
                      alt=""
                    />
                    <div>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/${article.author.username}`}
                      >
                        <h1
                          style={{ margin: "unset", fontSize: "14px" }}
                          className="home-content__header-username"
                        >
                          {article.author.username}
                        </h1>
                      </Link>
                      <p className="home-content__header-daytime">
                        {article.createdAt}
                      </p>
                    </div>
                  </div>
                  <button className="home-content__header-heartbtn">
                    <i className="fas fa-heart"></i>
                    <span onClick={() => setAddCount()}>
                      {article.favoritesCount}
                    </span>
                  </button>
                </div>
                <div className="home-content__body">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/articles/${article.slug}`}
                  >
                    <h1 style={{ color: "black", margin: "unset" }}>
                      {article.title}
                    </h1>
                  </Link>
                  <p>{article.description}</p>
                </div>
                <div className="home-content__read">
                  <Link to={`/articles/${article.slug}`}>
                    <p>Read more...</p>
                  </Link>
                  <Link
                    to={`/articles/${article.slug}`}
                    style={{
                      color: "#999",
                      paddingLeft: "440px",
                    }}
                  >
                    {article.tagList.map((tag: any, index: any) => (
                      <button className="home-content__read-btn" key={index}>
                        {tag}
                      </button>
                    ))}
                  </Link>
                </div>
              </div>
            ))}
          <div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={articles.length}
              paginate={paginate}
            />
          </div>
        </div>
        <div className="home-main__tags">
          <p>Popular Tags</p>
          <div className="home-main__tags-btn">
            {tags.map((tag: any, index: any) => (
              <a onClick={() => handleClick(tag)} key={index} className="tag">
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
