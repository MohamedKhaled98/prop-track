import { Flex, Typography } from "antd";
import { Outlet } from "react-router";

const { Title, Text } = Typography;
const AuthLayout = () => {
  return (
    <div className="h-lvh  bg-[url('src/assets/images/hero.png')] bg-cover bg-top-left">
      <div className="container px-12 pt-50 mx-auto ">
        <Flex justify="center">
          <Title className="font-bold text-white mb-12" level={1}>
            Homi Finder
          </Title>
        </Flex>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
