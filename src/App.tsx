import "./App.css";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Settings } from "./Pages/Settings";
import { ArticlesDetails } from "./Pages/ArticlesDetails";
import { store } from "./Components/Store";
import { Home } from "./Pages/Home";
import { GuestProfile } from "./Pages/GuestProfile";
import { AppProvider } from "./Components/GlobalContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { NewArticles } from "./Pages/PulishArticles";

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
    path: "/new-articles",
    element: <NewArticles />,
  },
  {
    path: "/articles/:slug",
    element: <ArticlesDetails />,
  },
  {
    path: "/:username",
    element: <GuestProfile />,
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
