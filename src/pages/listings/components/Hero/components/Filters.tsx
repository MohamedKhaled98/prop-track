import { Button, Flex, Input, InputNumber, Segmented, Select, Tag, Typography } from "antd";
import { SearchIcon } from "../../../../../assets/icons/SVG";

import { BATH_ROOMS, BED_ROOMS, PROPERTY_TYPES } from "../../../../../constants";
import { produce } from "immer";
import AppDropdown from "../../../../../components/common/AppDropdown";
import { useListingsQueryStore } from "../../../../../stores/listingQueryStore";
import type { ListingsFilter } from "../../../../../types/listing";
import { useState } from "react";
import AppLocationSearchField from "../../../../../components/common/AppLocationSearchInput";

const { Text } = Typography;
const Filters = () => {
  const query = useListingsQueryStore(state => state.query);
  const setQuery = useListingsQueryStore(state => state.setQuery);

  const [filters, setFilters] = useState<ListingsFilter["filter"]>(query.filter);

  const renderBedsAndBaths = () => {
    const { bedroomsValue = [], bathroomsValue = [] } = filters;

    const hasStudio = bedroomsValue.includes(0);
    const beds = hasStudio ? ["Studio"] : [];
    const regularBeds = bedroomsValue.filter(b => b !== 0);
    let baths = "";
    if (Boolean(regularBeds.length))
      beds.push(`${regularBeds.join(", ")} Bed${regularBeds.length > 1 ? "s" : ""}`);
    if (Boolean(bathroomsValue.length))
      baths = `${bathroomsValue.join(", ")} Bath${bathroomsValue.length > 1 ? "s" : ""}`;

    return [beds.join(","), baths].filter(Boolean).join(" | ") || null;
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-6 mb-5" data-aos="fade" data-aos-delay="1100">
        <Segmented
          options={["RENT", "SALE"]}
          value={filters.offeringType.toUpperCase()}
          onChange={value =>
            setFilters(
              produce(filters, draft => {
                draft.offeringType = value.toLowerCase();
              }),
            )
          }
          className="mb-4"
        />

        <Flex gap={8} wrap>
          <AppLocationSearchField
            prefix={<SearchIcon />}
            placeholder="City, community or tower..."
            className="w-fit min-w-72"
            valueKey="path"
            onClear={() =>
              setFilters(
                produce(filters, draft => {
                  delete draft.location;
                }),
              )
            }
            onSelect={location =>
              setFilters(
                produce(filters, draft => {
                  draft.location = location;
                }),
              )
            }
          />

          <Flex gap={8} wrap>
            <Select
              placeholder="Property Type"
              options={PROPERTY_TYPES}
              onChange={value =>
                setFilters(
                  produce(filters, draft => {
                    draft.propertyType = value;
                  }),
                )
              }
            />
            <AppDropdown
              text={renderBedsAndBaths() ?? ""}
              placeholder="Beds & Baths"
              content={
                <div className="">
                  <Text className="font-medium">Bedrooms</Text>
                  <Flex gap={4} wrap={false} className="mb-3">
                    {BED_ROOMS.map(br => (
                      <Tag.CheckableTag
                        key={br.label}
                        checked={filters.bedroomsValue.includes(br.value)}
                        onChange={checked =>
                          setFilters(
                            produce(filters, ({ bedroomsValue }) => {
                              if (checked) {
                                bedroomsValue.push(br.value);
                              } else {
                                const index = bedroomsValue.indexOf(br.value);
                                if (index > -1) bedroomsValue.splice(index, 1);
                              }
                            }),
                          )
                        }>
                        {br.label}
                      </Tag.CheckableTag>
                    ))}
                  </Flex>
                  <Text className="font-medium">Bathrooms</Text>
                  <Flex gap={4} wrap={false}>
                    {BATH_ROOMS.map(br => (
                      <Tag.CheckableTag
                        key={br.label}
                        checked={filters.bathroomsValue.includes(br.value)}
                        onChange={checked =>
                          setFilters(
                            produce(filters, ({ bathroomsValue }) => {
                              if (checked) {
                                bathroomsValue.push(br.value);
                              } else {
                                const index = bathroomsValue.indexOf(br.value);
                                if (index > -1) bathroomsValue.splice(index, 1);
                              }
                            }),
                          )
                        }>
                        {br.label}
                      </Tag.CheckableTag>
                    ))}
                  </Flex>
                </div>
              }
            />
            {/* <AppDropdown
              placement="bottomRight"
              text={""}
              placeholder="Price"
              content={
                <Flex gap={4} className="text-gray-300" align="center">
                  <InputNumber
                    placeholder="Min price"
                    className="w-fit max-w-40"
                    min={0}
                    formatter={formatAmount}
                  />
                  -
                  <InputNumber
                    placeholder="Max price"
                    className="w-fit max-w-40"
                    min={0}
                    formatter={formatAmount}
                  />
                </Flex>
              }
            /> */}
          </Flex>
        </Flex>
      </div>
      <Button
        data-aos="fade"
        data-aos-delay="1000"
        type="primary"
        className="min-w-xs"
        onClick={() =>
          setQuery(
            produce(query, draft => {
              draft.filter = filters;
            }),
          )
        }>
        Find
      </Button>
    </>
  );
};

export default Filters;
