import { Link, Outlet } from "react-router-dom";

export function PortfolioLayout() {
  return (
    <div className="flex flex-col gap-4 w-2/3">
      <div className="border border-black flex gap-4">
        <Link to={"/portfolio/"}>Summary</Link>
        <Link to={"/portfolio/favorites/diversification"}>Diversification</Link>
        <Link to={"/portfolio/"}>Dividends</Link>
        <Link to={"/portfolio/"}>Holdings</Link>
      </div>
      <Outlet />
    </div>
  );
}
