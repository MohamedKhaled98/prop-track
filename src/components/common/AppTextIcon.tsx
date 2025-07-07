import { Flex, Typography } from "antd";
import type { TextProps } from "antd/es/typography/Text";

interface Props {
  text: string;
  Icon: any;
  textType?: TextProps["type"];
  vertical?: boolean;
}
const AppTextIcon = ({ text, Icon, textType, vertical }: Props) => {
  return (
    <Flex align="center" gap={5} vertical={vertical}>
      {<Icon />}
      <Typography.Text type={textType}>{text}</Typography.Text>
    </Flex>
  );
};

export default AppTextIcon;
