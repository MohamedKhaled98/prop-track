import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router";
import agentSerice from "../../api/services/agent.service";
import storageUtils from "../../utils/storageUtils";
import type { Agent } from "../../types/agent";
import { useAgentStore } from "../../stores/agentStore";

const Login = () => {
  const navigate = useNavigate();
  const setAgent = useAgentStore(state => state.setAgent);
  const [form] = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: agentSerice.signup,
    onSuccess: (data: Agent) => {
      storageUtils.setAgentAccessId(data._id);
      setAgent(data);
      navigate("/properties");
    },
    onError: (err: Error) => form.setFields([{ name: "email", errors: [err.message] }]),
  });
  return (
    <div className="bg-white w-fit mx-auto min-w-md p-6 rounded-3xl">
      <Typography.Title level={4} className="mb-4">
        Agent Portal.
      </Typography.Title>
      <Form layout="vertical" onFinish={mutate}>
        <Form.Item name="fullName" rules={[{ required: true }]}>
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Email Address" />
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={isPending}>
          Continue as Agent
        </Button>
      </Form>
    </div>
  );
};

export default Login;
