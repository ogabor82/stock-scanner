import { Link, Outlet, useParams } from "react-router-dom";

export function PortfolioLayout() {
  return (
    <div className="flex flex-col gap-4 w-2/3">
      <div className="border border-black flex gap-4">
        <Link to={"/symbol/"}>Summary</Link>
        <Link to={"/symbol/"}>Dividends</Link>
        <Link to={"/symbol/"}>Holdings</Link>
      </div>
      <Outlet />
    </div>
  );
}
