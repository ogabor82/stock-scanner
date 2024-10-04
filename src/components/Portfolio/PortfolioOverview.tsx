import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSymbolFromCache } from "../../data/query";

export function PortfolioOverview() {
  const favorite = useSelector((state: any) => state.favorite);
  const queryClient = useQueryClient();
  const [portfolioData, setPortfolioData] = useState<any[]>([]);

  useEffect(() => {
    console.log(favorite);

    let data: any[] = [];
    async function fetchData() {
      for (const symbol of favorite) {
        let symbolData = await queryClient.fetchQuery({
          queryKey: ["symbolDataCached", symbol.symbol],
          queryFn: () => {
            return getSymbolFromCache(symbol.symbol);
          },
        });
        if (symbolData) {
          data.push(symbolData);
        }
        console.log(data);
      }
      setPortfolioData(data);
    }
    fetchData();
  }, [favorite]);

  return (
    <div>
      <h1>Portfolio Overview</h1>

      <p>This is a portfolio overview page.</p>
      <table>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>P/E TTM</th>
          <th>Price / Sales</th>
          <th>Yield TTM </th>
        </tr>
        {portfolioData &&
          portfolioData.map((item: any, index: any) => (
            <tr key={item.Symbol}>
              <td>{item.Symbol}</td>
              <td>{item.Name}</td>
              <td>{item.PERatio}</td>
              <td>{item.PriceToSalesRatioTTM}</td>
              <td>{Math.round(item.DividendYield * 10000) / 100}%</td>
            </tr>
          ))}
      </table>
    </div>
  );
}
