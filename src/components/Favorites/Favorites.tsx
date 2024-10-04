import { useDispatch, useSelector } from "react-redux";
import { Tag } from "antd";
import { Link } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { removeFavorite, sendFavorites } from "../../store/favorite";
import { useEffect } from "react";

export function Favorites() {
  const dispatch = useDispatch<any>();
  const favorite = useSelector((state: any) => state.favorite);

  // useEffect(() => {
  //   dispatch(sendFavorites(favorite));
  // }, [favorite, dispatch]);

  function removeHandler(item: any) {
    dispatch(removeFavorite(item));
  }

  return (
    <div>
      <h1>Favorites</h1>
      <p>This is a favorites page.</p>
      {favorite.map((item: any) => (
        <Tag color="blue" key={item.id}>
          <Link to={`/symbol/${item.symbol}`}>{item.symbol} </Link>
          <CloseOutlined
            className="hover:text-gray-950"
            onClick={() => {
              removeHandler(item.symbol);
            }}
          />
        </Tag>
      ))}
    </div>
  );
}
