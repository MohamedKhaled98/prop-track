import { Avatar, Button, Carousel, Divider, Flex, Modal, Typography } from "antd";
import AppTextIcon from "../../../components/common/AppTextIcon";
import { BathIcon, BedIcon, PinIcon, SizeIcon } from "../../../assets/icons/SVG";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import type { Listing } from "../../../types/listing";
import type { ContactOption } from "../../../types/agent";
import { formatAmount } from "../../../utils/function";
import InquiryModal from "./InquiryModal";

const { Title, Text } = Typography;

interface Props {
  listing: Listing | null;
  onClose: () => void;
}
const ListingItemDetailsModal = ({ listing, onClose }: Props) => {
  if (!listing) return;
  const { location, size, price } = listing;

  const handleContactAgent = (option: ContactOption) => {
    if (option.type === "phone") window.location.href = `tel:${option.value}`;
    else if (option.type === "email") window.location.href = `mailto:${option.value}`;
  };
  return (
    <Modal open={Boolean(listing)} onCancel={onClose} width={1000} footer={null}>
      <Carousel arrows className="rounded-3xl overflow-hidden">
        {listing?.images.map(img => (
          <div key={img}>
            <img src={img} className="h-58 w-full object-cover " alt="Propert image" />
          </div>
        ))}
      </Carousel>

      <Flex justify="space-between" align="center" className="mb-12">
        <div>
          <Title level={3} className="pt-4 mb-1">
            {formatAmount(price.value)} /{price.period}
          </Title>
          <Text type="secondary">
            {listing?.propertyType} for rent in {listing?.location.name.en}
          </Text>
        </div>
        <Flex gap={7} align="center" className="mt-4">
          <AppTextIcon vertical Icon={BedIcon} text={`${listing?.bedroomsValue} Bedrooms`} />
          <Divider type="vertical" />
          <AppTextIcon vertical Icon={BathIcon} text={`${listing?.bathroomsValue} Bathrooms`} />
          <Divider type="vertical" />
          <AppTextIcon vertical Icon={SizeIcon} text={`${size.value} ${size.unit}`} />
        </Flex>
      </Flex>
      <Flex justify="space-between">
        <div className="max-w-[600px] flex flex-col">
          <Text className="text-base">{listing?.description}</Text>
          <div className="mt-10">
            <Title level={5}>Location</Title>
            <AppTextIcon
              Icon={PinIcon}
              text={`${location?.name.en}, ${location?.pathName.en}`}
              textType="secondary"
            />
          </div>

          <Divider className="my-7" />

          <div>
            <Title level={5}>Amenities</Title>
            <Text className="text-base">{listing?.amenities.join(" | ")}</Text>
          </div>
        </div>
        <div>
          <div className="border border-gray-200 p-3.5 rounded-2xl min-w-72">
            <Title level={5} className="mb-5">
              Contact Agent
            </Title>
            <Flex gap={10} className="mb-6">
              <Avatar size={40}>AG</Avatar>
              <Flex vertical>
                <Text className="mb-0">{listing?.agent.fullName}</Text>
                <Text>{listing?.agent.email}</Text>
              </Flex>
            </Flex>
            <Flex gap={6}>
              {listing.agent.contactOptions?.map(op => (
                <Button
                  icon={mapContactIcon?.[op.type]?.icon}
                  className="w-full "
                  size="middle"
                  variant="filled"
                  type="primary"
                  onClick={() => handleContactAgent(op)}>
                  {mapContactIcon?.[op.type]?.label}
                </Button>
              ))}
            </Flex>
          </div>
          <Divider children="OR" className="text-sm text-gray-400" />
          <InquiryModal listingId={listing._id} />
        </div>
      </Flex>
    </Modal>
  );
};
const mapContactIcon: any = {
  phone: {
    label: "Call",
    icon: <PhoneOutlined />,
  },
  email: {
    label: "Mail",
    icon: <MailOutlined />,
  },
};

export default ListingItemDetailsModal;
