import LeftNavigation from "../components/Menu/LeftNavigation";
import { Outlet } from "react-router-dom";
import { TopNavigation } from "../components/Menu/TopNavigation";
import classes from "./Root.module.css";

export function RootLayot() {
  return (
    <div className={classes.content}>
      <div className="flex flex-row h-full gap-48">
        <LeftNavigation />
        <div>
          <TopNavigation />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
