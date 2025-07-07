import { Layout } from "antd";
import Hero from "../pages/listings/components/Hero";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <Layout>
      <Hero />
      <Outlet />
    </Layout>
  );
};

export default AppLayout;
