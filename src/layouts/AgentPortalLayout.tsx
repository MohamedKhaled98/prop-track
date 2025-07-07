import { Button, Input, Layout } from "antd";
import { Outlet } from "react-router";
import AgentPortalSidebar from "../components/AgentSidebar";
import { SearchOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;

const AgentPortalLayout = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <Layout hasSider>
      <AgentPortalSidebar />
      <Layout className="flex flex-col">
        <Header className="px-6 border-b border-b-gray-200 bg-white flex justify-between items-center">
          <Input
            className="w-fit border-0 bg-gray-100"
            prefix={<SearchOutlined className="text-gray-400" />}
          />
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content className="px-6 pt-8">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AgentPortalLayout;
