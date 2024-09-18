import { useSelector } from "react-redux";
import { Auth } from "../Auth/Auth";
import { TopNavigation } from "../Menu/TopNavigation";

export function Home() {
  const isAuthenticated = useSelector(
    (state: any) => state.authentication.isAuthenticated
  );
  return (
    <div>
      {isAuthenticated ? (
        <>
          <h1>Welcome back!</h1>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}
