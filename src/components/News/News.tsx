import { useQuery } from "@tanstack/react-query";
import { NewsCard } from "./NewsCard";
import { newsData } from "../../data/cache/news";
import { TopNavigation } from "../Menu/TopNavigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendFavorites } from "../../store/favorite";

export function News() {
  const dispatch = useDispatch<any>();
  const favorite = useSelector((state: any) => state.favorite);

  useEffect(() => {
    dispatch(sendFavorites(favorite));
  }, [favorite, dispatch]);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["newsData"],
    queryFn: async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=${
          import.meta.env.VITE_VANTAGE_KEY
        }`
      );

      const data = await response.json();
      if (!data.feed) {
        return newsData;
      }

      return data;
    },
    staleTime: 30000,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>News</h1>
      <p>This is a news page.</p>

      <div className="grid grid-cols-3 gap-4">
        {data.feed.map((item: any) => (
          <div key={item.id}>
            <NewsCard item={item} />
          </div>
        ))}
      </div>

      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}
