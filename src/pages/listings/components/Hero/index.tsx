import { Button, Flex, Typography } from "antd";
import Filters from "./components/Filters";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-white">
      <div className="rounded-3xl overflow-hidden bg-[url('src/assets/images/hero.png')] bg-cover bg-top-left">
        <div className="container px-12 pt-6 mx-auto" data-aos="fade-down" data-aos-delay="1500">
          <Flex justify="space-between">
            <Title className="m-0 font-bold text-white" level={4}>
              Homi Finder
            </Title>
            <Button
              variant="solid"
              className="bg-transparent text-white hover:bg-primary"
              onClick={() => navigate("/properties")}>
              Agent Portal
            </Button>
          </Flex>
        </div>
        <div className="py-44 flex flex-col items-center">
          <Title className="text-white text-6xl mb-4" data-aos="fade-up">
            Find your dream home
          </Title>
          <Text className="text-white/70 text-lg mb-8" data-aos="fade-up" data-aos-delay="200">
            Explore homes in every details with 360 virtual Tours
          </Text>
          <Filters />
        </div>
      </div>
    </div>
  );
};

export default Hero;
