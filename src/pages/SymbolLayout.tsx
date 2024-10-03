import { Link, Outlet, useParams } from "react-router-dom";

export function SymbolLayout() {
  const { symbol } = useParams();
  return (
    <div className="flex flex-row gap-4">
      <div className="border border-black flex flex-col">
        <Link to={"/symbol/" + symbol}>Stock Overview</Link>
        <Link to={"/symbol/" + symbol}>Earnings</Link>
        <Link to={"/symbol/" + symbol}>Headlines</Link>
      </div>
      <Outlet />
    </div>
  );
}
