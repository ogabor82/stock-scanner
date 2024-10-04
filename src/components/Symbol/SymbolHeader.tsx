import {
  PlusOutlined,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons";

interface SymbolHeaderProps {
  symbol: string;
  name: string;
  PERatio: number;
  PriceToSalesRatioTTM: number;
  MarketCapitalization: number;
  EPS: number;
  DividendPerShare: number;
  DividendYield: number;
}

export function SymbolHeader(props: SymbolHeaderProps) {
  const {
    symbol,
    name,
    PERatio,
    PriceToSalesRatioTTM,
    MarketCapitalization,
    EPS,
    DividendPerShare,
    DividendYield,
  } = props;
  return (
    <div className="w-full border border-gray-400 rounded-md bg-white p-8">
      <div className="flex flex-row justify-between">
        <div>
          <div>{name}</div>
          <div>{symbol}</div>
        </div>
        <div className="flex flex-row gap-2">
          <div>
            <StarOutlined />
          </div>
          <div>
            <PlusOutlined />
          </div>
          <div>
            <ShareAltOutlined />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row">
          <div>Price</div>
          <div>Change</div>
          <div>Change %</div>
        </div>

        <div className="flex flex-row justify-between gap-4">
          <div>
            <div>P/E Ratio</div>
            <div>{PERatio}</div>
          </div>
          <div>
            <div>P/S Ratio</div>
            <div>{PriceToSalesRatioTTM}</div>
          </div>
          <div>
            <div>Market Cap</div>
            <div>${MarketCapitalization}</div>
          </div>
          <div>
            <div>EPS</div>
            <div>{EPS}</div>
          </div>
          <div>
            <div>Dividend/Share</div>
            <div>${DividendPerShare}</div>
          </div>
          <div>
            <div>Dividend Yield</div>
            <div>{DividendYield}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
