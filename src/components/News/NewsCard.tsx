import { NewsItem } from "../../models/news";
import { Tag, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, sendFavorite } from "../../store/favorite";
import { useEffect } from "react";

export function NewsCard({ item }: { item: NewsItem }) {
  const dispatch = useDispatch<any>();
  const favorite = useSelector((state: any) => state.favorite);

  const addFavoriteHandler = (ticker: string) => {
    dispatch(addFavorite(ticker));
  };

  useEffect(() => {
    console.log("Favorite changed");

    dispatch(sendFavorite(favorite));
  }, [favorite, dispatch]);

  return (
    <div className="border border-blue-600 w-96 h-full rounded-lg">
      <h2 className="font-bold min-h-20">{item.title}</h2>
      <Tag color="green">{item.overall_sentiment_label}</Tag>
      <img src={item.banner_image} alt={item.title} />
      <p className="text-sm">{item.summary}</p>
      <div className="flex justify-between flex-wrap">
        {item.ticker_sentiment.map((ticker) => (
          <div key={ticker.ticker}>
            <p>
              <Tag color="blue">{ticker.ticker}</Tag>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  addFavoriteHandler(ticker.ticker);
                }}
              >
                Favorite
              </Button>
            </p>
            <Tag color="green">{ticker.ticker_sentiment_label}</Tag>
          </div>
        ))}
      </div>
    </div>
  );
}
