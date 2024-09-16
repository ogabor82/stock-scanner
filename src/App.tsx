import "./App.css";
import { Favorites } from "./components/Favorites/Favorites";
import { News } from "./components/News/News";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { SymbolPage } from "./components/Symbol/SymbolPage";
import { Home } from "./components/Home/Home";
import { useEffect } from "react";
import LeftNavigation from "./components/Menu/LeftNavigation";

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
  const favorite = useSelector((state: any) => state.favorite);

  useEffect(() => {
    fetch(
      "https://stock-scanner-6109b-default-rtdb.europe-west1.firebasedatabase.app/favorite.json",
      {
        method: "PUT",
        body: JSON.stringify(favorite),
      }
    );
  }, [favorite]);

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
