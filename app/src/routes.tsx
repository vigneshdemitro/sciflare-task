import { lazy, useEffect, useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import UnauthorizedLayout from "./layouts/UnauthorizedLayout";
import AuthLayout from "./layouts/AuthLayout";

const Error = lazy(() => import("./features/error/Error"));
const Home = lazy(() => import("./features/home/Home"));
const About = lazy(() => import("./features/help/Help"));
const Login = lazy(() => import("./features/auth/Login"));
const Signup = lazy(() => import("./features/auth/Signup"));
const Profile = lazy(() => import("./features/profile/Profile"));
const Organization = lazy(() => import("./features/organization/Organizaition"));

export default function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const isAdmin = role === 'admin';
    if (location.pathname === '/redirect') {
      let url = '/profile';
      if (!user || !role) url = '/login';
      if (isAdmin) url = '/organization';
      navigate(url);
    }
  }, [location]);

  return useRoutes([
    {
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Profile /> },
        { path: "profile", element: <Profile /> },
        { path: "organization", element: <Organization /> },
        { path: "error", element: <Error /> },
      ],
    },
    {
      element: <UnauthorizedLayout />,
      children: [
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "/", element: <Login /> },
      ],
    },
  ]);
}
