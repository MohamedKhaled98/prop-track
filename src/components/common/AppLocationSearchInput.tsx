import { Flex, Select, Spin, Typography, type SelectProps } from "antd";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { Location } from "../../types/location";
import locationService from "../../api/services/location.service";
import { useQuery } from "@tanstack/react-query";
import { PinIcon } from "../../assets/icons/SVG";
import { HomeOutlined } from "@ant-design/icons";

const { Text } = Typography;
interface Props extends SelectProps {
  valueKey?: keyof Location;
  handleClear?: () => void;
}

const AppLocationSearchField = ({ valueKey = "_id", handleClear, ...props }: Props) => {
  const [query, setQuery] = useState("");

  const { data, isLoading } = useQuery<Location[]>({
    queryKey: ["location", query],
    queryFn: () => locationService.search(query),
  });

  const options: any =
    data?.map((l: Location) => ({
      key: l._id,
      label: l.name.en,
      value: l[valueKey],
      avatar: l.type,
      pathName: l.pathName?.en,
    })) ?? [];

  const debounceFetcher = useDebouncedCallback(setQuery, 300);

  return (
    <Select
      className="w-full"
      filterOption={false}
      placeholder="Location city"
      options={options}
      loading={isLoading}
      onClear={() => {
        setQuery("");
        handleClear?.();
      }}
      showSearch
      onSearch={debounceFetcher}
      allowClear
      notFoundContent={isLoading ? <Spin size="small" /> : "No results found"}
      optionRender={option => (
        <Flex className="p-1" align="center" gap={10}>
          {option.data?.avatar === "TOWER" ? <HomeOutlined /> : <PinIcon />}
          <Flex vertical>
            <div className="text-base">{option.label}</div>
            <Text type="secondary">{option.data?.pathName}</Text>
          </Flex>
        </Flex>
      )}
      {...props}
    />
  );
};

export default AppLocationSearchField;
