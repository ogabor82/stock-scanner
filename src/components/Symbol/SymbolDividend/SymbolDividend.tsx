import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getDividends } from "../../../data/query";
import { Table } from "@mantine/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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

      <LineChart
        width={1200}
        height={300}
        data={dividendList.reverse()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="exDividendDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>

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
                  <Table.Td>{item.exDividendDate}</Table.Td>
                  <Table.Td>{item.declarationDate}</Table.Td>
                  <Table.Td>{item.recordDate}</Table.Td>
                  <Table.Td>{item.paymentDate}</Table.Td>
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
