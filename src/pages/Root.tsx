import { Outlet } from "react-router-dom";
import Navbar from "../components/Menu/Navbar";

export function RootLayout() {
  return (
    <div className="flex flex-col w-full gap-4">
      <Navbar />

      <div className="w-full flex flex-row justify-center">
        {/* <LeftNavigation /> */}
        <Outlet />
      </div>
    </div>
  );
}
