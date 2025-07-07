import { Button, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import type { ItemType } from "antd/es/menu/interface";

interface Props {
  items: ItemType[];
}
const AppTableRowActions = ({ items }: Props) => {
  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
      placement="bottomRight">
      <Button icon={<EllipsisOutlined />} size="small" type="text" />
    </Dropdown>
  );
};

export default AppTableRowActions;
