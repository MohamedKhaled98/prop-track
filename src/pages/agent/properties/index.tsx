import { Button, Flex, Image, Tag, Typography } from "antd";
import AppTable from "../../../components/common/AppTable";
import type { ColumnsType } from "antd/es/table";
import type { Listing } from "../../../types/listing";
import { useState } from "react";
import listingService from "../../../api/services/listing.service";
import type { PaginatedResponse } from "../../../types/common";
import { useQuery } from "@tanstack/react-query";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { formatAmount } from "../../../utils/function";
import { produce } from "immer";

const { Text } = Typography;
const Properties = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<any>({ page: 1, limit: 5 });

  const { data, isLoading } = useQuery<PaginatedResponse>({
    queryKey: ["properties", query],
    queryFn: () => listingService.fetchListings(query),
  });

  return (
    <AppTable
      title="Properties Management"
      subtitle="Track your proerties with ease"
      loading={isLoading}
      actions={[
        <Button
          key="add-property"
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => navigate("/properties/new")}>
          Add Property
        </Button>,
      ]}
      columns={propertColumns}
      data={data}
      limit={query.limit}
      onChange={p => {
        setQuery(
          produce(query, (draft: any) => {
            draft.page = p.current;
          }),
        );
      }}
      rowActions={[
        {
          key: "edit",
          label: "Edit",
          icon: <EditOutlined />,
          // onClick: (record: any) => navigate(`/properties/${record._id}`),
        },
        {
          key: "delete",
          label: "Delete",
          icon: <DeleteOutlined />,
          danger: true,
          onClick(record: any) {
            // handle delete property
          },
        },
      ]}
    />
  );
};

export default Properties;

export const propertColumns: ColumnsType<Listing> = [
  {
    title: "Property",
    dataIndex: "name",
    key: "",
    render: (_, record) => (
      <Flex gap={10} align="center">
        <Image
          src={`${import.meta.env.VITE_PUBLIC_DOMAIN}/${record.images?.[0]}`}
          className="h-22 w-22 object-cover rounded-2xl"
          alt="Propert image"
          preview={false}
          fallback="/fallback.png"
        />
        <div className="max-w-42">
          <Text ellipsis className="max-w-52 font-semibold block mb-1">
            {record.title}
          </Text>
          <Text ellipsis className="">
            {record.location.name.en}
          </Text>
        </div>
      </Flex>
    ),
  },
  {
    title: "Type",
    dataIndex: "propertyType",
    key: "propertyType",
    render: value => <Tag>{value}</Tag>,
  },
  {
    title: "Offering",
    dataIndex: "offeringType",
    key: "offeringType",
  },
  {
    title: "Price",
    dataIndex: ["price", "value"],
    key: "price",
    render: formatAmount,
  },
  {
    title: "Size",
    dataIndex: "size",
    key: "size",
    render: (size, record) => `${size.value} ${size.unit}`,
  },
];
