import { useState } from "react";
import {
  MailOutlined,
  SettingOutlined,
  HeartFilled,
  HomeFilled,
  StockOutlined,
  DollarOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Home",
    key: "",
    icon: <HomeFilled style={{ color: "hotpink" }} />,
  },
  {
    label: "News",
    key: "news",
    icon: <MailOutlined style={{ color: "green" }} />,
  },
  {
    label: "Favorites",
    key: "favorites",
    icon: <HeartFilled style={{ color: "red" }} />,
  },
  {
    label: "New portfolio",
    key: "createportfolio",
    icon: <DollarOutlined style={{ color: "green" }} />,
  },
  {
    label: "Portfolio analytics",
    key: "portfolio/favorites",
    icon: <BarChartOutlined style={{ color: "green" }} />,
  },
];

export function TopNavigation() {
  const [current, setCurrent] = useState("mail");
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };

  return (
    <div className="flex justify-between items-center">
      <div className="font-bold">
        <span className="text-5xl text-green-600">
          <StockOutlined />
        </span>
        {""}
        <span className="text-red-500">StockSight</span>
      </div>
      <div className="w-full">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>
    </div>
  );
}
