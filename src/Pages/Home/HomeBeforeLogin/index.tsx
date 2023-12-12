/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useParams } from "react-router-dom";
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
    };
    fetchArtices();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);

  const getTagName = (tagName: any) => {
    setTagList(tagName);
    httpClient
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
        <h1>BlogReact</h1>
        <p>A place to share your knowledge</p>
      </div>
      <div className="home-main">
        <div className="home-main__global">
          <div className="home-main__global-feed">
            <Link style={{ display: "flex", textDecoration: "none" }} to="/">
              <button style={{ color: "green", padding: "10px 0px" }}>
                Global Feed
              </button>
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
                        {`${new Date(article.createdAt).toDateString()}`}
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
          <p style={{ fontWeight: "bold" }}>Popular Tags</p>
          <div className="home-main__tags-btn">
            {tags.map((tag: any, index: any) => (
              <Link
                onClick={() => getTagName(tag)}
                key={index}
                className="tag"
                to={""}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
