import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Spin,
  Typography,
  Upload,
} from "antd";
import { InfoIcon } from "../../../../assets/icons/SVG";
import {
  BATH_ROOMS,
  BED_ROOMS,
  OFFERING_TYPES,
  PROPERTY_TYPES,
  RENT_PERIOD,
} from "../../../../constants";
import { useState } from "react";
import { CameraOutlined } from "@ant-design/icons";
import { formatAmount } from "../../../../utils/function";
import AppLocationSearchField from "../../../../components/common/AppLocationSearchInput";
import { serialize } from "object-to-formdata";
import { useMutation } from "@tanstack/react-query";
import propertyService from "../../../../api/services/property.service";
import { useNavigate } from "react-router";
const { Title, Text } = Typography;

const PropertyForm = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);

  const { mutate, isPending } = useMutation({
    mutationFn: propertyService.create,
    onSuccess: () => {
      message.success("Property has been created successfully!");
      navigate("/properties");
    },
    onError: (err: Error) => message.error(err.message),
  });

  const handleFileChange = ({ fileList: newFileList }: any) => {
    const filteredList = newFileList.filter(
      (file: any) => !file.status || file.status !== "removed",
    );
    setFileList(filteredList);
  };

  const getFilesFromEvent = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const handleSubmit = (values: any) => {
    const payload = { ...values };
    const formData = serialize(payload);

    fileList?.forEach((file: any) => formData.append("images", file.originFileObj));

    mutate(formData);
  };
  return (
    <Spin spinning={isPending}>
      <Card className="max-w-[900px] rounded-3xl p-2 bg-gray-50 mb-12">
        <InfoIcon />
        <Title className="text-xl pt-3.5 mb-1">Add New Property</Title>
        <Text type="secondary" className="text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </Text>
        <Divider variant="dashed" />
        <Form layout="vertical" onFinish={handleSubmit} disabled={isPending}>
          <Form.Item
            name="images"
            label="Upload Images"
            valuePropName="fileList"
            getValueFromEvent={getFilesFromEvent}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleFileChange}
              multiple
              accept="image/*"
              beforeUpload={() => false}
              maxCount={2}>
              {fileList.length < 2 && <CameraOutlined className="text-primary" />}
            </Upload>
            <Typography.Text type="secondary">Max 2MB per image (jpg, png)</Typography.Text>
          </Form.Item>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Title Name" />
          </Form.Item>
          <Form.Item name="description" label="Property Description" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Row gutter={12}>
            <Col xs={12} lg={12}>
              <Form.Item name="propertyType" label="Property Type" rules={[{ required: true }]}>
                <Select placeholder="Property Type" options={PROPERTY_TYPES} />
              </Form.Item>
            </Col>
            <Col xs={12} lg={12}>
              <Form.Item name="offeringType" label="Offering Type" rules={[{ required: true }]}>
                <Select placeholder="Offering Type" options={OFFERING_TYPES} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col xs={12} lg={12}>
              <Form.Item name="bedroomsValue" label="Bedrooms" rules={[{ required: true }]}>
                <Select placeholder="Bedrooms" options={BED_ROOMS} />
              </Form.Item>
            </Col>
            <Col xs={12} lg={12}>
              <Form.Item name="bathroomsValue" label="Bathrooms" rules={[{ required: true }]}>
                <Select placeholder="Bathrooms" options={BATH_ROOMS} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="locationRef" label="Location" rules={[{ required: true }]}>
            <AppLocationSearchField />
          </Form.Item>

          <Row gutter={12}>
            <Col xs={12} lg={12}>
              <Form.Item name={["price", "value"]} label="Price" rules={[{ required: true }]}>
                <InputNumber
                  placeholder="Price"
                  formatter={formatAmount}
                  className="w-full"
                  suffix="AED"
                />
              </Form.Item>
            </Col>
            <Form.Item noStyle shouldUpdate>
              {({ getFieldValue }) =>
                getFieldValue("offeringType") === "rent" ? (
                  <Form.Item
                    name={["price", "period"]}
                    label="Period"
                    rules={[{ required: true }]}
                    className="grow">
                    <Select options={RENT_PERIOD} />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Col xs={12} lg={12}>
              <Form.Item name={["size", "value"]} label="Unit Size" rules={[{ required: true }]}>
                <InputNumber
                  placeholder="Size"
                  formatter={formatAmount}
                  suffix="sqft"
                  className="w-full"
                />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </Spin>
  );
};

export default PropertyForm;
