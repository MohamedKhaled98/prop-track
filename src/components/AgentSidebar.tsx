import { Button, Menu, theme, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { EyeOutlined, HomeOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

const AgentPortalSidebar = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(location.pathname);
  const onClick: MenuProps["onClick"] = e => {
    setCurrent(e.key);
    navigate(e.key);
  };

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const defaultOpenKeys = pathSegments.length > 1 ? [`/${pathSegments[0]}`] : [];

  return (
    <Sider trigger={null} className="h-lvh sticky left-0 top-0">
      <div className=" text-2xl font-bold px-3 pt-4 pb-1 ">Homi Agent</div>
      <Link to="/" className="text-gray-100 px-3 mb-6 block">
        {" "}
        Back to listings
      </Link>

      <Menu
        theme="dark"
        mode="inline"
        onClick={onClick}
        selectedKeys={[current]}
        defaultOpenKeys={defaultOpenKeys}
        items={[
          {
            key: "/properties",
            icon: <HomeOutlined />,
            label: "Properties",
          },
          {
            key: "/inquiries",
            icon: <MessageOutlined />,
            label: "Inquiries",
          },
          {
            key: "/viewings",
            icon: <EyeOutlined />,
            label: "Viewings",
          },
          {
            key: "/contacts",
            icon: <UserOutlined />,
            label: "Contacts",
          },
        ]}
      />
    </Sider>
  );
};

export default AgentPortalSidebar;
