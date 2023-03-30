import "./App.css";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Settings } from "./Pages/Settings";
import { Editor } from "./Pages/Editor";
import { ArticlesDetails } from "./Pages/ArticlesDetails";
import { store } from "./Components/Store";
import { Home } from "./Pages/Home";
import { GuestProfile } from "./Pages/GuestProfile";
import { PublishArticle } from "./Pages/PublishArticle";
import { AppProvider } from "./Components/GlobalContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },
  {
    path: "/articles/:slug",
    element: <ArticlesDetails />,
  },
  {
    path: "/:username",
    element: <GuestProfile />,
  },
  {
    path: "/publish-articles",
    element: <PublishArticle />,
  },
]);

function App() {
  return (
    <AppProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AppProvider>
  );
}

export default App;
