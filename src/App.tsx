import "./App.css";
import { Favorites } from "./components/Favorites/Favorites";
import { News } from "./components/News/News";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    path: "/favorites",
    element: <Favorites />,
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
