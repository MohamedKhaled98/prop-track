import { Button, Empty, Flex, Pagination, Spin, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import type { Listing } from "../../types/listing";
import listingService from "../../api/services/listing.service";
import { useQuery } from "@tanstack/react-query";
import type { PaginatedResponse } from "../../types/common";
import { useEffect, useRef, useState } from "react";
import { useListingsQueryStore } from "../../stores/listingQueryStore";
import ListingItem from "./components/ListingItem";
import ListingItemDetailsModal from "./components/ListingItemDetailsModal";
import { produce } from "immer";
const { Title, Text } = Typography;

const Listings = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const initialized = useListingsQueryStore(state => state.initialized);

  const query = useListingsQueryStore(state => state.query);
  const setQuery = useListingsQueryStore(state => state.setQuery);

  const [selectedPropery, setSelectedPropery] = useState<Listing | null>(null);

  const { data, isFetching } = useQuery<PaginatedResponse<Listing>>({
    queryKey: ["listings", query],
    queryFn: () => listingService.fetchListings(query),
    enabled: initialized,
  });

  useEffect(() => {
    scrollToRef();
  }, [data]);

  const scrollToRef = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePageChange = (page: number) => {
    setQuery(
      produce(query, draft => {
        draft.page = page;
      }),
    );
  };

  if (!initialized) return;
  return (
    <Spin spinning={isFetching}>
      <div className="container mx-auto max-w-screen-lg" data-aos="fade-up" ref={scrollRef}>
        <Flex justify="space-between" className="mb-16">
          <div>
            <Title level={2} className="mb-2">
              Properties {query.filter.location ? "in Al Khan" : "Everywhere"}
            </Title>
            <Text>{data?.total} properties</Text>
          </div>
          {Boolean(data && data?.page < data?.totalPages) && (
            <Button
              iconPosition="end"
              type="text"
              icon={<ArrowRightOutlined />}
              onClick={() => handlePageChange(query.page! + 1)}>
              Next
            </Button>
          )}
        </Flex>

        <Flex vertical gap={30}>
          {data?.data?.map((listing: Listing) => (
            <ListingItem listing={listing} onClick={setSelectedPropery} />
          ))}
        </Flex>

        {!isFetching && !Boolean(data?.total) && <Empty />}

        <Pagination
          className="py-12"
          showQuickJumper
          current={query.page}
          align="center"
          pageSize={query?.limit}
          total={data?.total}
          onChange={handlePageChange}
        />
        <Text className="block pb-12 text-center" type="secondary">
          © 2025 Mohamed Khaled. All rights reserved.
        </Text>
      </div>
      <ListingItemDetailsModal listing={selectedPropery} onClose={() => setSelectedPropery(null)} />
    </Spin>
  );
};

export default Listings;
