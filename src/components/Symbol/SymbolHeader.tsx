interface SymbolHeaderProps {
  symbol: string;
  name: string;
}

export function SymbolHeader(props: SymbolHeaderProps) {
  const { symbol, name } = props;
  return (
    <div className="w-full border border-gray-400 rounded-md bg-white">
      <div className="flex flex-row justify-between">
        <div>
          <div>{name}</div>
          <div>{symbol}</div>
        </div>
        <div>Favorite</div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div>Price</div>
          <div>Change</div>
          <div>Change %</div>
        </div>

        <div className="flex flex-row">
          <div>Open</div>
          <div>High</div>
          <div>Low</div>
        </div>
      </div>
    </div>
  );
}
