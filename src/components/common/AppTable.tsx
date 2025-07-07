import { Flex, Spin, Table, Typography } from "antd";
import { useDebouncedCallback } from "use-debounce";
import { useMemo, type ReactNode } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { PaginatedResponse } from "../../types/common";
import type { MenuItemType } from "antd/es/menu/interface";
import AppTableRowActions from "./AppTableRowActions";

const { Title, Text } = Typography;
type rowAction = { onClick?: (record: any) => void } & MenuItemType;

interface Props {
  rowKey?: string;
  title?: string;
  subtitle?: string;
  actions?: ReactNode[];
  columns: ColumnsType<any>;
  loading?: boolean;
  data?: PaginatedResponse;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onChange?: TableProps["onChange"];
  rowSelection?: TableProps["rowSelection"];
  selectedRowsActions?: ReactNode[];
  filters?: ReactNode[];
  rowActions?: rowAction[];
  rowLoadingKeys?: Set<string>;
  limit?: number;
}

const AppTable = ({
  rowKey = "_id",

  title,
  subtitle,
  actions,
  columns,
  data,
  loading,
  rowActions,
  rowLoadingKeys,
  rowSelection,
  onSearchChange,
  onChange,
  filters,
  limit = 10,
}: Props) => {
  const debounced = useDebouncedCallback(value => {
    onSearchChange?.(value);
  }, 600);

  const renderedColumns = useMemo(() => {
    if (!rowActions) return columns;

    return [
      ...columns,
      {
        key: "actions",
        width: 16,
        render: (_: any, record: any) => {
          if (rowLoadingKeys?.has(record?.[rowKey])) {
            return <Spin size="small" className="h-8 flex items-center" />;
          }

          const actions = rowActions.map(action => ({
            ...action,
            onClick: () => action.onClick?.(record),
          }));

          return <AppTableRowActions items={actions} />;
        },
      },
    ];
  }, [rowLoadingKeys, columns]);
  return (
    <>
      <Flex justify="space-between" align="center" className="mb-8">
        <Flex vertical>
          {title && (
            <Title level={3} className="mb-1">
              {title}
            </Title>
          )}
          {subtitle && <Text type="secondary">{subtitle}</Text>}
        </Flex>
        {actions}
      </Flex>

      <div className="border border-gray-200/80 rounded-xl bg-white">
        <Table
          rowKey="_id"
          columns={renderedColumns}
          dataSource={data?.data}
          loading={loading}
          rowSelection={rowSelection}
          scroll={{ x: "max-content" }}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          pagination={data ? { total: data.total, current: data.page, pageSize: limit } : {}}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default AppTable;
