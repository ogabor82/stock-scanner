import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useParams } from "react-router-dom";
import { getSymbol, getSymbolFromCache } from "../data/query";
import { useEffect, useState } from "react";
import { SymbolHeader } from "../components/Symbol/SymbolHeader";

export function SymbolLayout() {
  const { symbol } = useParams();
  const [symbolData, setSymbolData] = useState<any | null>(null);

  const {
    data: cachedData,
    error: cachedError,
    isLoading: isCachedLoading,
  } = useQuery({
    queryKey: ["symbolDataCached", symbol],
    queryFn: () => {
      return getSymbolFromCache(symbol);
    },
    staleTime: 3000000,
  });

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["symbolData", symbol],
    queryFn: () => {
      return getSymbol(symbol);
    },
    staleTime: 3000000,
    enabled: cachedData === null,
  });

  useEffect(() => {
    if (cachedData) {
      setSymbolData(cachedData);
    } else {
      setSymbolData(data);
    }
  }, [cachedData, data]);

  useEffect(() => {
    const cacheData = async () => {
      const response = await fetch(
        `https://stock-scanner-6109b-default-rtdb.europe-west1.firebasedatabase.app/cache/${symbol}.json`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Could not send favorite");
      }
    };
    if (data && !cachedData) {
      cacheData();
    }
  }, [data, cachedData]);

  if (error || cachedError)
    return "An error has occurred: " + error?.message + cachedError?.message;

  return (
    <div className="flex flex-col gap-4 w-2/3">
      <SymbolHeader
        symbol={symbolData.Symbol}
        name={symbolData.Name}
        PERatio={symbolData.PERatio}
        PriceToSalesRatioTTM={symbolData.PriceToSalesRatioTTM}
        MarketCapitalization={symbolData.MarketCapitalization}
        EPS={symbolData.EPS}
        DividendPerShare={symbolData.DividendPerShare}
        DividendYield={symbolData.DividendYield}
      />
      <div className="border border-black flex ">
        <Link to={"/symbol/" + symbol}>Stock Overview</Link>
        <Link to={"/symbol/" + symbol}>Earnings</Link>
        <Link to={"/symbol/" + symbol}>Headlines</Link>
      </div>
      <Outlet />
    </div>
  );
}
