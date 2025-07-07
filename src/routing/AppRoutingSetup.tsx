import { Route, Routes } from "react-router";
import NotFound from "../pages/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../guards/ProtectedRoute";
import Listings from "../pages/listings";
import AppLayout from "../layouts/AppLayout";
import AgentPortalLayout from "../layouts/AgentPortalLayout";
import { Spin } from "antd";

const Login = lazy(() => import("../pages/auth/Login"));
const Properties = lazy(() => import("../pages/agent/properties"));
const PropertyForm = lazy(() => import("../pages/agent/properties/components/PropertyForm"));
const Inquiries = lazy(() => import("../pages/agent/inquiries"));
const Viewings = lazy(() => import("../pages/agent/viewings"));
const Contacts = lazy(() => import("../pages/agent/contacts"));

const AppRoutingSetup = () => {
  return (
    <Suspense
      fallback={
        <div className="h-dvh w-full flex items-center justify-center">
          <Spin />
        </div>
      }>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Listings />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AgentPortalLayout />}>
            <Route path="/properties">
              <Route index element={<Properties />} />
              <Route path=":id/edit" element={<PropertyForm />} />
              <Route path="new" element={<PropertyForm />} />
            </Route>
            <Route path="/inquiries">
              <Route index element={<Inquiries />} />
            </Route>
            <Route path="/viewings">
              <Route index element={<Viewings />} />
            </Route>
            <Route path="/contacts">
              <Route index element={<Contacts />} />
            </Route>
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutingSetup;
