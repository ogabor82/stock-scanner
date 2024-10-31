import { useQuery } from "@tanstack/react-query";
import { Outlet, useParams } from "react-router-dom";
import { getSymbol } from "../data/query";
import StockCard from "../components/Symbol/StockCard";

export function SymbolLayout() {
  const { symbol } = useParams();

  const {
    isPending,
    error,
    data: symbolData,
    isFetching,
  } = useQuery({
    queryKey: ["symbolData", symbol],
    queryFn: () => {
      return getSymbol(symbol);
    },
    staleTime: 3000000,
  });

  if (isPending) return "Loading...";

  if (isFetching) return "Updating...";

  if (error) return "An error has occurred: " + error?.message;

  return (
    <div className="flex flex-col gap-4 w-2/3">
      {symbolData && (
        <StockCard
          symbol={symbolData.symbol}
          name={symbolData.name}
          PERatio={symbolData.PERatio}
          PriceToSalesRatioTTM={symbolData.priceToSalesRatioTTM}
          MarketCapitalization={symbolData.marketCapitalization}
          EPS={symbolData.EPS}
          DividendPerShare={symbolData.dividendPerShare}
          DividendYield={symbolData.dividendYield}
        />
      )}
      <Outlet />
    </div>
  );
}
