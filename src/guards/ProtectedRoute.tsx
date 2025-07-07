import { Navigate, Outlet } from "react-router";
import { useAgentStore } from "../stores/agentStore";

const ProtectedRoute = () => {
  const agent = useAgentStore(state => state.agent);
  return agent ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
