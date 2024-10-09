import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDividends } from "../../../data/query";
import { Table } from "@mantine/core";

export function SymbolDividend() {
  const { symbol } = useParams();

  const {
    isPending,
    error,
    data: dividendList,
    isFetching,
  } = useQuery({
    queryKey: ["dividendList", symbol],
    queryFn: () => {
      return getDividends(symbol);
    },
    staleTime: 3000000,
  });

  if (isPending) return "Loading...";

  if (isFetching) return "Updating...";

  if (error) return "An error has occurred: " + error?.message;

  return (
    <div>
      <h1>Symbol Dividend</h1>

      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Ex dividend date</Table.Th>
              <Table.Th>Declaration date</Table.Th>
              <Table.Th>Record date</Table.Th>
              <Table.Th>Payment date</Table.Th>
              <Table.Th>Amount</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {dividendList.length > 0 ? (
              dividendList.map((item: any) => (
                <Table.Tr key={item.exDividendDate}>
                  <Table.Td>{item.ex_dividend_date}</Table.Td>
                  <Table.Td>{item.declaration_date}</Table.Td>
                  <Table.Td>{item.record_date}</Table.Td>
                  <Table.Td>{item.payment_date}</Table.Td>
                  <Table.Td>{item.amount}</Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>No dividends</Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
