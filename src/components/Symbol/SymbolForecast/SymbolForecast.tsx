import { useQuery } from "@tanstack/react-query";
import { getSymbol } from "../../../data/query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Progress,
  Box,
  Text,
  Group,
  Paper,
  SimpleGrid,
  rem,
} from "@mantine/core";

export function SymbolForecast() {
  const { symbol } = useParams();
  const [ratingData, setRatingData] = useState<any>([]);

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

  useEffect(() => {
    const sumAnalystRatingCount =
      parseInt(symbolData.analystRatingStrongBuy) +
      parseInt(symbolData.analystRatingBuy) +
      parseInt(symbolData.analystRatingHold) +
      parseInt(symbolData.analystRatingSell) +
      parseInt(symbolData.analystRatingStrongSell);

    const ratingData = [
      {
        label: "Strong Buy",
        count: symbolData.analystRatingStrongBuy,
        part: (symbolData.analystRatingStrongBuy / sumAnalystRatingCount) * 100,
        color: "#2E7D32",
      },
      {
        label: "Buy",
        count: symbolData.analystRatingBuy,
        part: (symbolData.analystRatingBuy / sumAnalystRatingCount) * 100,
        color: "#4CAF50",
      },
      {
        label: "Hold",
        count: symbolData.analystRatingHold,
        part: (symbolData.analystRatingHold / sumAnalystRatingCount) * 100,
        color: "#FFEB3B",
      },
      {
        label: "Sell",
        count: symbolData.analystRatingSell,
        part: (symbolData.analystRatingSell / sumAnalystRatingCount) * 100,
        color: "#F44336",
      },
      {
        label: "Strong Sell",
        count: symbolData.analystRatingStrongSell,
        part:
          (symbolData.analystRatingStrongSell / sumAnalystRatingCount) * 100,
        color: "#B71C1C",
      },
    ];
    setRatingData(ratingData);
  }, [symbolData]);

  return (
    <div>
      <h1>Symbol Forecast</h1>
      <p>analystTargetPrice: {symbolData.analystTargetPrice}</p>

      <Progress.Root size={34} mt={40}>
        {ratingData.map((segment: any) => (
          <Progress.Section
            value={segment.part}
            color={segment.color}
            key={segment.color}
          >
            {segment.part > 10 && (
              <Progress.Label>{Math.round(segment.part)}%</Progress.Label>
            )}
          </Progress.Section>
        ))}
      </Progress.Root>

      <div className="flex justify-between pt-8 gap-4">
        {ratingData.map((segment: any) => (
          <>
            {segment.count > 0 && (
              <div
                key={segment.color}
                className="w-full flex flex-col justify-start items-start"
              >
                <div className="uppercase text-gray-400 font-bold">
                  {segment.label}
                </div>
                <div className="w-full flex flex-row justify-between">
                  <p className="font-bold">{segment.count}</p>
                  <p
                    style={{
                      color: segment.color,
                    }}
                    className="font-bold"
                  >
                    {Math.round(segment.part)}%
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: segment.color,
                    height: "4px",
                  }}
                  className="w-full"
                ></div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
