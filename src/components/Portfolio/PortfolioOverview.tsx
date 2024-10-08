import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getPortfolio } from "../../data/query";
import { Table } from "@mantine/core";
import { AnimatePresence } from "framer-motion";

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

      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Symbol</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>P/E TTM</Table.Th>
              <Table.Th>Price / Sales</Table.Th>
              <Table.Th>Yield TTM</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {portfolioData.length > 0 ? (
              <AnimatePresence>
                {portfolioData.map((item: any) => (
                  <Table.Tr key={item.symbol}>
                    <Table.Td>{item.symbol}</Table.Td>
                    <Table.Td>{item.name}</Table.Td>
                    <Table.Td>{item.PERatio}</Table.Td>
                    <Table.Td>{item.priceToSalesRatioTTM}</Table.Td>
                    <Table.Td>
                      {Math.round(item.dividendYield * 10000) / 100}%
                    </Table.Td>
                  </Table.Tr>
                ))}
              </AnimatePresence>
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>No data</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
