import { Dropdown, Flex, Input, theme, Typography, type DropdownProps } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { useToken } = theme;
const { Text } = Typography;
interface Props {
  text: string;
  placement?: DropdownProps["placement"];
  content: any;
  placeholder?: string;
}
const AppDropdown = ({ text, content, placeholder, placement }: Props) => {
  const { token } = useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  return (
    <Dropdown
      trigger={["click"]}
      popupRender={() => (
        <div className="p-3.5" style={contentStyle}>
          {content}
        </div>
      )}
      placement={placement}>
      <Flex
        gap={6}
        align="center"
        style={{
          borderColor: token.colorBorder,
          borderWidth: 1,
          borderRadius: token.borderRadiusLG,
          height: token.controlHeightLG,
          padding: token.controlPaddingHorizontal,
        }}>
        <Text
          style={{
            fontSize: token.fontSizeLG,
            color: Boolean(text) ? token.colorText : token.colorTextPlaceholder,
          }}>
          {Boolean(text) ? text : placeholder}
        </Text>
        <DownOutlined className="text-xs text-black/25" />
      </Flex>
    </Dropdown>
  );
};

export default AppDropdown;
