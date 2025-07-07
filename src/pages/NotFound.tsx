import { Flex, Typography } from "antd";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <Flex vertical align="center" style={{ padding: 60 }}>
      <Typography.Title>Page not found. 404</Typography.Title>
      <Link to="/"> Back to home</Link>
    </Flex>
  );
};

export default NotFound;
