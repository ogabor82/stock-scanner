import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../../../data/query";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

export function PortfolioDiversification() {
  const favorite = useSelector((state: any) => state.favorite);
  const symbols = favorite.map((item: any) => item.symbol);
  const [sectorData, setSectorData] = useState<any>([]);
  const [industryData, setIndustryData] = useState<any>([]);

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

  useEffect(() => {
    const sectorData: any[] = [];
    const industryData: any[] = [];
    for (const item of portfolioData) {
      const portfolioSector = sectorData.find(
        (sector) => sector.label === item.sector
      );
      if (portfolioSector) {
        portfolioSector.value++;
      } else {
        sectorData.push({ label: item.sector, value: 1 });
      }
    }

    for (const item of sectorData) {
      const sector = item.label;
      const sectorSymbols = portfolioData.filter(
        (data: any) => data.sector === sector
      );

      for (const symbol of sectorSymbols) {
        const industries = industryData.find(
          (industry) => industry.label === symbol.industry
        );
        if (industries) {
          industries.value++;
        } else {
          industryData.push({ label: symbol.industry, value: 1 });
        }
      }
    }

    setSectorData(sectorData);
    setIndustryData(industryData);
  }, [portfolioData]);

  if (isPending) return "Loading...";
  if (isFetching) return "Updating...";
  if (error) return "An error has occurred: " + error?.message;

  return (
    <div>
      <h1>Portfolio Diversification</h1>
      {sectorData && sectorData.length > 0 && (
        <PieChart
          width={1200}
          height={600}
          slotProps={{
            legend: { hidden: true },
          }}
          series={[
            {
              innerRadius: 0,
              outerRadius: 215,
              arcLabel: (item) => `${item.label}`,
              arcLabelRadius: 140,
              id: "sector-series",
              data: sectorData,
            },
            {
              innerRadius: 220,
              outerRadius: 240,
              arcLabel: (item) => `${item.label}`,
              arcLabelRadius: 270,
              id: "industry-series",
              data: industryData,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: "bold",
              fontSize: 10,
            },
          }}
        />
      )}
    </div>
  );
}
