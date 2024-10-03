import { Card } from "antd";

export function SymbolOverviewCard(props: any) {
  const data = props.data;
  return (
    <div className="w-80">
      <Card title="Overview" bordered={true}>
        <div className="grid grid-cols-2 gap-4">
          <div className="font-bold">EPS</div>
          <div>{data.EPS}</div>
          <div className="font-bold">PE (FWD)</div>
          <div>{data.ForwardPE}</div>
          <div className="font-bold">PE (Trailing)</div>
          <div>{data.TrailingPE}</div>

          <div className="font-bold">PS (TTM)</div>
          <div>{data.PriceToSalesRatioTTM}</div>

          <div className="font-bold">Dividend Yield</div>
          <div>{data.DividendYield}</div>

          <div className="font-bold">Dividend Per Share</div>
          <div>{data.DividendPerShare}</div>

          <div className="font-bold">Dividend Date</div>
          <div>{data.DividendDate}</div>

          <div className="font-bold">Ex Dividend Date</div>
          <div>{data.ExDividendDate}</div>
        </div>
      </Card>
    </div>
  );
}
