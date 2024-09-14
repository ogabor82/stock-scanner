import { NewsItem } from "../../models/news";
import { Tag } from "antd";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="border border-blue-600 w-96 h-full rounded-lg">
      <h2 className="font-bold min-h-20">{item.title}</h2>
      <Tag color="green">{item.overall_sentiment_label}</Tag>
      <img src={item.banner_image} alt={item.title} />
      <p className="text-sm">{item.summary}</p>
      <div className="flex justify-between flex-wrap">
        {item.ticker_sentiment.map((ticker) => (
          <div key={ticker.ticker}>
            <p>{ticker.ticker}</p>
            <Tag color="green">{ticker.ticker_sentiment_label}</Tag>
          </div>
        ))}
      </div>
    </div>
  );
}
