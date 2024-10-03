import "./App.css";
import { Favorites } from "./components/Favorites/Favorites";
import { News } from "./components/News/News";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SymbolPage } from "./components/Symbol/SymbolPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFavorites } from "./store/favorite";
import { NewPortfolio } from "./components/Portfolio/NewPortfolio";
import { RootLayout } from "./pages/Root";
import { SymbolLayout } from "./pages/SymbolLayout";
import { SymbolOverview } from "./components/Symbol/SymbolOverview/SymbolOverview";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/createportfolio",
        element: <NewPortfolio />,
      },
      {
        path: "/symbol",
        element: <SymbolLayout />,
        children: [
          {
            path: "/symbol/:symbol",
            element: <SymbolOverview />,
          },
        ],
      },
    ],
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
        <div className="flex flex-row">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
