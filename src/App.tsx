import "./App.css";
import { Favorites } from "./components/Favorites/Favorites";
import { News } from "./components/News/News";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SymbolPage } from "./components/Symbol/SymbolPage";
import { Home } from "./components/Home/Home";
import LeftNavigation from "./components/Menu/LeftNavigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFavorites } from "./store/favorite";
import { NewPortfolio } from "./components/Portfolio/NewPortfolio";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/news",
    element: <News />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/symbol/:symbol",
    element: <SymbolPage />,
  },
  {
    path: "/createportfolio",
    element: <NewPortfolio />,
  },
]);

function App() {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-row h-full gap-48">
          <LeftNavigation />
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
