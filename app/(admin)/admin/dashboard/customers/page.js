import CustomersTable from "@/components/admin/customers/CustomersTable";
import CustomersTableSkeleton from "@/components/admin/customers/CustomersTableSkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Customers | Ponno Admin",
};

const CustomerPage = () => {
  return (
    <Suspense fallback={<CustomersTableSkeleton />}>
      <CustomersTable />
    </Suspense>
  );
};

export default CustomerPage;
