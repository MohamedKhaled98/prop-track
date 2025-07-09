import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import inquiryService from "../../../api/services/inquiry.service";

interface Props {
  listingId: string;
}
const InquiryModal = ({ listingId }: Props) => {
  const [form] = useForm();
  const [open, setOpen] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: inquiryService.submitInquiry,
    onError: (error: any) => {
      const err = `${error.message} - ${error?.errors?.[0]} `;
      message.error(err);
    },
    onSuccess: () => {
      form.resetFields();
      setOpen(false);
      message.success("Inquiry has been submitted successfully!");
    },
  });

  return (
    <>
      <Button className="w-full" size="middle" onClick={() => setOpen(true)}>
        Submit Inquiry
      </Button>
      <Modal
        loading={isPending}
        open={open}
        destroyOnHidden
        onCancel={() => setOpen(false)}
        title="Inquiry"
        okText="Submit"
        onOk={form.submit}>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          className="pt-4"
          onFinish={values => mutate({ ...values, propertyOfInterest: listingId })}
          disabled={isPending}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input your name!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Please input your email!", type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please input your email!", type: "string" }]}>
            <Input.TextArea rows={4} placeholder="Tell us, how we can help you?" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InquiryModal;
