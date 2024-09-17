import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TopNavigation } from "../Menu/TopNavigation";
import { SymbolOverview } from "./SymbolOverview";
import {
  getSymbol,
  getSymbolDescription,
  getSymbolFromCache,
} from "../../data/query";
import { OpenAIFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export function SymbolPage() {
  const { symbol } = useParams();
  const [description, setDescription] = useState<string | null>(null);
  let [symbolData, setSymbolData] = useState<any | null>(null);

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
      console.log("data 2", data);
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
    if (data) {
      cacheData();
    }
  }, [data, symbol]);

  const getAIDescriptionHandler = async () => {
    const description = await getSymbolDescription(data);
    setDescription(description);
  };

  // if (isPending || isCachedLoading) return "Loading...";

  if (error || cachedError) return "An error has occurred: " + error?.message;

  return (
    <div>
      <TopNavigation />
      <div>{isFetching ? "Updating..." : ""}</div>
      {symbolData && (
        <>
          <h1 className="font-bold text-lg">
            Symbol: {symbol} - {symbolData?.Name}
          </h1>
          <div className="flex justify-between">
            <img src="https://www.bankrate.com/brp/2023/08/22121220/chart.jpg" />
            <SymbolOverview data={symbolData} />
          </div>
          <OpenAIFilled onClick={getAIDescriptionHandler} />
          <ReactMarkdown className="text-left">{description}</ReactMarkdown>
        </>
      )}
    </div>
  );
}
