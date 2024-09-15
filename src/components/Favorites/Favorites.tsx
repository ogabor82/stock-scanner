import { TopNavigation } from "../Menu/TopNavigation";
import { useSelector } from "react-redux";
import { Tag } from "antd";

export function Favorites() {
  const favorite = useSelector((state: any) => state.favorite);

  return (
    <div>
      <TopNavigation />
      <h1>Favorites</h1>
      <p>This is a favorites page.</p>
      {favorite.map((item: any) => (
        <Tag color="blue" key={item}>
          {item}
        </Tag>
      ))}
    </div>
  );
}
