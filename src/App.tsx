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
import { fetchFavorite } from "./store/favorite";

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
]);

function App() {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchFavorite());
  }, []);

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
