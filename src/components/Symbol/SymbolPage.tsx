import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TopNavigation } from "../Menu/TopNavigation";
import { SymbolOverview } from "./SymbolOverview";

export function SymbolPage() {
  const { symbol } = useParams();

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["symbolData", symbol],
    queryFn: async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${
          import.meta.env.VITE_VANTAGE_KEY
        }`
      );

      const data = await response.json();
      return data;
    },
    staleTime: 3000000,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <TopNavigation />
      <div>{isFetching ? "Updating..." : ""}</div>
      <h1 className="font-bold text-lg">
        Symbol: {symbol} - {data.Name}
      </h1>
      <div className="flex justify-between">
        <img src="https://www.bankrate.com/brp/2023/08/22121220/chart.jpg" />
        <SymbolOverview data={data} />
      </div>
    </div>
  );
}
