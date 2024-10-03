import { useState } from "react";
import {
  MailOutlined,
  SettingOutlined,
  HeartFilled,
  HomeFilled,
  StockOutlined,
  DollarOutlined,
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
    label: "Navigation Three - Submenu",
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        label: "Item 1",
        children: [
          { label: "Option 1", key: "setting:1" },
          { label: "Option 2", key: "setting:2" },
        ],
      },
      {
        type: "group",
        label: "Item 2",
        children: [
          { label: "Option 3", key: "setting:3" },
          { label: "Option 4", key: "setting:4" },
        ],
      },
    ],
  },
  {
    key: "alipay",
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
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
