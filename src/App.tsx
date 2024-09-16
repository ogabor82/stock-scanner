import "./App.css";
import { Favorites } from "./components/Favorites/Favorites";
import { News } from "./components/News/News";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { SymbolPage } from "./components/Symbol/SymbolPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: <News />,
  },
  {
    path: "/",
    element: <News />,
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
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
