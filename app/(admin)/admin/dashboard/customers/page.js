import { Suspense } from "react";
import CustomersTable from "@/components/admin/customers/CustomersTable";

export const metadata = {
  title: "Customers | Ponno Admin",
};

const CustomerPage = () => {
  return (
    <Suspense fallback={<div className="text-slate-400">Loading...</div>}>
      <CustomersTable />
    </Suspense>
  );
};

export default CustomerPage;
