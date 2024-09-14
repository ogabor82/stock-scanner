import { useQuery } from "@tanstack/react-query";

export function News() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(
        "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo"
      );
      return await response.json();
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>News</h1>
      <p>This is a news page.</p>

      {data.feed.map((item: any) => (
        <div key={item.id} className="border border-blue-600">
          <h2>{item.title}</h2>
          <p>{item.summary}</p>
        </div>
      ))}

      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}
