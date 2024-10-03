import LeftNavigation from "../components/Menu/LeftNavigation";
import { Outlet } from "react-router-dom";
import { TopNavigation } from "../components/Menu/TopNavigation";

export function RootLayout() {
  return (
    <div className="flex flex-col w-full gap-4">
      <TopNavigation />

      <div className="w-full flex flex-row justify-center">
        {/* <LeftNavigation /> */}
        <Outlet />
      </div>
    </div>
  );
}
