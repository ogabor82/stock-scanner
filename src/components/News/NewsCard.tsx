import { NewsItem } from "../../models/news";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="border border-blue-600 w-96 h-full rounded-lg">
      <h2 className="font-bold min-h-20">{item.title}</h2>
      <img src={item.banner_image} alt={item.title} />
      <p className="text-sm">{item.summary}</p>
    </div>
  );
}
