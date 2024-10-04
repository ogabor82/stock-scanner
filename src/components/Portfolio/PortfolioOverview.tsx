import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getPortfolio } from "../../data/query";

export function PortfolioOverview() {
  const favorite = useSelector((state: any) => state.favorite);
  const symbols = favorite.map((item: any) => item.symbol);

  const {
    isPending,
    error,
    data: portfolioData,
    isFetching,
  } = useQuery({
    queryKey: ["portfolioData"],
    queryFn: () => {
      return getPortfolio(symbols);
    },
    staleTime: 3000000,
  });

  if (isPending) return "Loading...";
  if (isFetching) return "Updating...";
  if (error) return "An error has occurred: " + error?.message;

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
            <tr key={item.symbol}>
              <td>{item.symbol}</td>
              <td>{item.name}</td>
              <td>{item.PERatio}</td>
              <td>{item.priceToSalesRatioTTM}</td>
              <td>{Math.round(item.dividendYield * 10000) / 100}%</td>
            </tr>
          ))}
      </table>
    </div>
  );
}
