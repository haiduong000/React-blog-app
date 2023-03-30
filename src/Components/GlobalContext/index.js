import React, { useState, createContext } from "react";
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [isFollowing, setIsFollowing] = useState(true);
  const [isFavorite, setIsFavorite] = useState(true);
  const [article, setArticle] = useState(null);
  const [userLogin, setUserLogin] = useState(null);
  const [countFavorite, setCountFavorite] = useState(article?.favoritesCount);

  return (
    <AppContext.Provider
      value={{
        isFollowing,
        setIsFollowing,
        isFavorite,
        setIsFavorite,
        article,
        setArticle,
        userLogin,
        setUserLogin,
        countFavorite,
        setCountFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
