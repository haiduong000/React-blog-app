import React, { JSXElementConstructor } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { Header } from "../../../Components/Header";
import { httpClient } from "../../../api/httpClient";
import Pagination from "../../Pagination";

export const HomeBeforeLogin = () => {
  const [tags, setTags] = useState<any>([]);
  const [articles, setArticles] = useState([]);
  const [count, setCount] = useState<any>();
  const [tagList, setTagList] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    axios.get(`https://api.realworld.io/api/tags`).then((res) => {
      setTags(res.data.tags);
    });
  }, []);

  useEffect(() => {
    const fetchArtices = async () => {
      setLoading(true);
      const res = await httpClient.get(
        "https://api.realworld.io/api/articles",
        {
          params: {
            limit: 200,
            offset: 0,
          },
        }
      );
      setArticles(res.data.articles);
      setLoading(false);
    };
    fetchArtices();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);
  console.log(articles);

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
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div className="home-title">
        <h1>conduit</h1>
        <p>A place to share your knowledge</p>
      </div>
      <div className="home-main">
        <div className="home-main__global">
          <div className="home-main__global-feed">
            <Link style={{ display: "flex", textDecoration: "none" }} to="/">
              <button>Global Feed</button>
              <p>{tagList ? tagList : ""} </p>
            </Link>
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
                    style={{ textDecoration: "none", textAlign: "justify" }}
                    to={`/articles/${article.slug}`}
                  >
                    <h1 style={{ color: "black", margin: "unset" }}>
                      {article.title}
                    </h1>
                    <p>{article.description}</p>
                  </Link>
                </div>
                <div className="home-content__read">
                  <a href="">Read more...</a>
                  <div>
                    {article.tagList.map((tag: any, index: any) => {
                      <button key={index}>{tag}</button>;
                    })}
                  </div>
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
