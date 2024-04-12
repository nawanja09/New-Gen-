import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // Remove one of the import statements for App
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadAccessories from "../dashboard/UploadAccessories";
import ManageAccessories from "../dashboard/ManageAccessories";
import EditAccessories from "../dashboard/EditAccessories";
import Reports from "../dashboard/Reports";
import { Contact } from "../dashboard/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadAccessories />,
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageAccessories />,
      },
      {
        path: "/admin/dashboard/edit-accessories/:id",
        element: <EditAccessories />,
        loader: ({ params }) =>
          fetch(`http://localhost:8000/accessories/${params.id}`),
      },
      {
        path: "/admin/dashboard/report",
        element: <Reports />,
      },
      {
        path: "/admin/dashboard/contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;
