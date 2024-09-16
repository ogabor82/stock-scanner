import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TopNavigation } from "../Menu/TopNavigation";
import { SymbolOverview } from "./SymbolOverview";
import { getSymbol, getSymbolDescription } from "../../data/query";
import { OpenAIFilled } from "@ant-design/icons";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export function SymbolPage() {
  const { symbol } = useParams();
  const [description, setDescription] = useState<string | null>(null);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["symbolData", symbol],
    queryFn: () => {
      return getSymbol(symbol);
    },
    staleTime: 3000000,
  });

  const getAIDescriptionHandler = async () => {
    const description = await getSymbolDescription(data);
    setDescription(description);
  };

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
      <OpenAIFilled onClick={getAIDescriptionHandler} />
      <ReactMarkdown className="text-left">{description}</ReactMarkdown>
    </div>
  );
}
