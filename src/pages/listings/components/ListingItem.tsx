import { Divider, Flex, Image, Typography } from "antd";
import { BathIcon, BedIcon, PinIcon, SizeIcon } from "../../../assets/icons/SVG";
import AppTextIcon from "../../../components/common/AppTextIcon";
import type { Listing } from "../../../types/listing";
import { formatAmount } from "../../../utils/function";

const { Title, Text } = Typography;

interface Props {
  listing: Listing;
  onClick: (listing: Listing) => void;
}
const ListingItem = ({ listing, onClick }: Props) => {
  const { location, size, price } = listing;

  return (
    <div
      className="border border-gray-200 rounded-3xl flex overflow-hidden max-w-[900px] cursor-pointer hover:shadow-xl"
      data-aos="animation"
      onClick={() => onClick(listing)}>
      <Image
        src={`${import.meta.env.VITE_PUBLIC_DOMAIN}/${listing.images?.[0]}`}
        className=" h-58 object-cover "
        width="33%"
        rootClassName="w-full h-58"
        fallback="/fallback.png"
        preview={false}
      />
      <div className="p-6 flex flex-col">
        <Text type="secondary">{listing.propertyType}</Text>
        <Title level={3} className="font-semibold mt-0.5">
          {formatAmount(price.value)} AED/{price.period}
        </Title>
        <Text type="secondary" className="max-w-96 mt-2" ellipsis>
          {listing.title}
        </Text>
        <div className="mt-auto">
          <AppTextIcon
            Icon={PinIcon}
            text={`${location.name.en}, ${location.pathName.en}`}
            textType="secondary"
          />
          <Flex gap={7} align="center" className="mt-4">
            <AppTextIcon Icon={BedIcon} text={listing.bedroomsValue?.toString()} />
            <Divider type="vertical" />
            <AppTextIcon Icon={BathIcon} text={listing.bathroomsValue?.toString()} />
            <Divider type="vertical" />
            <AppTextIcon Icon={SizeIcon} text={`${size.value} ${size.unit}`} />
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default ListingItem;
