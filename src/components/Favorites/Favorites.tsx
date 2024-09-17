import { TopNavigation } from "../Menu/TopNavigation";
import { useDispatch, useSelector } from "react-redux";
import { Tag } from "antd";
import { Link } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { removeFavorite, sendFavorites } from "../../store/favorite";
import { useEffect } from "react";

export function Favorites() {
  const dispatch = useDispatch<any>();
  const favorite = useSelector((state: any) => state.favorite);

  useEffect(() => {
    dispatch(sendFavorites(favorite));
  }, [favorite, dispatch]);

  function removeHandler(item: any) {
    console.log("removeHandler", item);
    dispatch(removeFavorite(item));
  }

  return (
    <div>
      <TopNavigation />
      <h1>Favorites</h1>
      <p>This is a favorites page.</p>
      {favorite.map((item: any) => (
        <Tag color="blue" key={item}>
          <Link to={`/symbol/${item}`} key={item}>
            {item}{" "}
          </Link>
          <CloseOutlined
            className="hover:text-gray-950"
            onClick={() => {
              removeHandler(item);
            }}
          />
        </Tag>
      ))}
    </div>
  );
}
