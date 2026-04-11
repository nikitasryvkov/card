import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClientDashboardPage from "./pages/ClientDashboardPage";
import AdminOverviewPage from "./pages/admin/AdminOverviewPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./router/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        element: <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]} />,
        children: [{ path: "dashboard", element: <ClientDashboardPage /> }],
      },
      {
        path: "admin",
        element: <ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />,
        children: [
          {
            element: <AdminDashboardLayout />,
            children: [{ index: true, element: <AdminOverviewPage /> }],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
