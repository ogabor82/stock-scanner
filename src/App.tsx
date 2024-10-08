import "./App.css";
import { Favorites } from "./components/Favorites/Favorites";
import { News } from "./components/News/News";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFavorites } from "./store/favorite";
import { NewPortfolio } from "./components/Portfolio/NewPortfolio";
import { RootLayout } from "./pages/Root";
import { SymbolLayout } from "./pages/SymbolLayout";
import { SymbolOverview } from "./components/Symbol/SymbolOverview/SymbolOverview";
import { PortfolioOverview } from "./components/Portfolio/PortfolioOverview";
import { PortfolioLayout } from "./pages/PortfolioLayout";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { SymbolDividend } from "./components/Symbol/SymbolDividend/SymbolDividend";
import { SymbolForecast } from "./components/Symbol/SymbolForecast/SymbolForecast";
import { PortfolioDiversification } from "./components/Portfolio/PortfolioDiversification/PortfolioDiversification";

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
            path: "/symbol/:symbol/dividends",
            element: <SymbolDividend />,
          },
          {
            path: "/symbol/:symbol/forecast",
            element: <SymbolForecast />,
          },
          {
            path: "/symbol/:symbol",
            element: <SymbolOverview />,
          },
        ],
      },
      {
        path: "/portfolio",
        element: <PortfolioLayout />,
        children: [
          {
            path: "/portfolio/:portfolioId/diversification",
            element: <PortfolioDiversification />,
          },
          {
            path: "/portfolio/:portfolioId",
            element: <PortfolioOverview />,
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
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <div className="flex flex-row">
            <RouterProvider router={router} />
          </div>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}

export default App;
