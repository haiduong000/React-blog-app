import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { httpClient } from "../../api/httpClient";
import { AppContext } from "../GlobalContext";
import "./style.css";

export const ButtonFollowFavoried = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  const {
    isFollowing,
    setIsFollowing,
    isFavorite,
    setIsFavorite,
    article,
    userLogin,
    countFavorite,
    setCountFavorite,
  } = useContext(AppContext);

  const handleFollow = () => {
    if (!token) {
      navigate("/login");
    }
    httpClient({
      method: isFollowing ? "delete" : "post",
      url: `/profiles/${article.author.username}/follow`,
    })
      .then((res) => {
        setIsFollowing(!isFollowing);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleFavorite = () => {
    if (!token) {
      navigate("/login");
    }

    httpClient({
      method: isFavorite ? "delete" : "post",
      url: `/articles/${slug}/favorite`,
    })
      .then((res) => {
        setIsFavorite(!isFavorite);
        isFavorite
          ? setCountFavorite((prev: any) => prev - 1)
          : setCountFavorite((prev: any) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = () => {
    if (!token) {
      navigate("/login");
    }
  };

  const handleDeleteArticle = () => {
    if (!token) {
      navigate("/login");
    } else {
      httpClient.delete(`/articles/${slug}`).then((res) => {
        navigate(`/${userLogin.username}`);
      });
    }
  };

  return (
    <div className="button-main">
      {article?.author?.username === userLogin?.username ? (
        <>
          <button onClick={handleEdit} className="articles-header__info--edit">
            <span className="icon">
              <i className="far fa-edit"></i>
            </span>
            {"Edit Article"}
          </button>
          <button
            onClick={handleDeleteArticle}
            className="articles-header__info--delete"
          >
            <span className="icon">
              <i className="fas fa-trash-alt"></i>
            </span>
            {"Delete Article"}
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleFollow}
            className="articles-header__info--follow"
          >
            <span className="icon">
              <i className="fas fa-plus"></i>
            </span>
            {isFollowing ? "Unfollow " : "Follow "}
            {article?.author?.username}
          </button>
          <button
            onClick={handleFavorite}
            className="articles-header__info--unfollow"
          >
            <span className="icon">
              <i className="fa fa-heart"></i>
            </span>
            {isFavorite ? "Unfavorite Article " : "Favorite Article "}(
            {countFavorite})
          </button>
        </>
      )}
    </div>
  );
};
