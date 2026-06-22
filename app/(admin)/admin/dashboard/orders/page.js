import ManageOrdersClient from "@/components/admin/orders/ManageOrdersClient";
import { Suspense } from "react";

export const metadata = { title: "Manage Orders – Ponno Admin" };

const ManageOrdersPage = () => {
  return (
    <Suspense fallback={null}>
      <ManageOrdersClient />
    </Suspense>
  );
};

export default ManageOrdersPage;
