import {
  PlusOutlined,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

interface StockCardProps {
  symbol: string;
  name: string;
  PERatio: number;
  PriceToSalesRatioTTM: number;
  MarketCapitalization: number;
  EPS: number;
  DividendPerShare: number;
  DividendYield: number;
}

const StockCard = (props: StockCardProps) => {
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
    <div className="bg-white rounded-lg shadow-lg p-6 mt-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Company Info */}
        <div className="flex items-center space-x-4">
          <img
            src={"https://logo.clearbit.com/" + symbol + ".com"}
            alt={name}
            className="w-12 h-12 rounded-md"
          />
          <div>
            <h1 className="text-xl font-semibold">{name}</h1>
            <p className="text-sm text-gray-500">{symbol}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
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
        {/* Stock Price */}
        <div className="mt-4">
          <h2 className="text-4xl font-semibold">$758.49</h2>
          <p className="text-green-600 mt-1 text-lg">+$4.75 (+0.63%)</p>
        </div>

        {/* Additional Info */}
        <div className="mt-4 flex space-x-10 text-sm text-gray-500">
          <div>
            <p className="text-gray-400">P/E</p>
            <p className="font-medium text-gray-700">{PERatio}</p>
          </div>
          <div>
            <p className="text-gray-400">EPS</p>
            <p className="font-medium text-gray-700">{EPS}</p>
          </div>
          <div>
            <p className="text-gray-400">Market cap</p>
            <p className="font-medium text-gray-700">${MarketCapitalization}</p>
          </div>
          <div>
            <p className="text-gray-400">Price to Sales Ratio (TTM)</p>
            <p className="font-medium text-gray-700">{PriceToSalesRatioTTM}</p>
          </div>
          <div>
            <p className="text-gray-400">Dividend per Share</p>
            <p className="font-medium text-gray-700">{DividendPerShare}</p>
          </div>
          <div>
            <p className="text-gray-400">Dividend Yield</p>
            <p className="font-medium text-gray-700">{DividendYield}%</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex space-x-6 text-gray-500 text-sm border-b">
        <Link
          to={"/symbol/" + symbol}
          className="pb-2 border-b-2 border-blue-500 text-blue-600 font-semibold"
        >
          Stock Overview
        </Link>
        <Link
          to={`/symbol/${symbol}/dividends`}
          className="pb-2 hover:text-gray-700"
        >
          Dividends
        </Link>
        <Link
          to={`/symbol/${symbol}/forecast`}
          className="pb-2 hover:text-gray-700"
        >
          Analyst Forecasts
        </Link>
        <Link to={"/symbol/" + symbol} className="pb-2 hover:text-gray-700">
          Earnings
        </Link>
        <Link to={"/symbol/" + symbol} className="pb-2 hover:text-gray-700">
          Headlines
        </Link>
      </div>
    </div>
  );
};

export default StockCard;
