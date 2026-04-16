import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import RequisitesPage from "./pages/RequisitesPage";
import OfferPage from "./pages/OfferPage";
import PrivacyPage from "./pages/PrivacyPage";
import ConsentPage from "./pages/ConsentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "requisites", element: <RequisitesPage /> },
      { path: "offer", element: <OfferPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "consent", element: <ConsentPage /> },
      { path: "login", element: <Navigate to="/" replace /> },
      { path: "register", element: <Navigate to="/" replace /> },
      { path: "dashboard", element: <Navigate to="/" replace /> },
      { path: "admin", element: <Navigate to="/" replace /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
