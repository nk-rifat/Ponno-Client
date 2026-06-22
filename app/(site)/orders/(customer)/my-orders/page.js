import OrdersPageClient from "@/components/orders/my-orders/OrdersPageClient";

export const metadata = {
  title: "My Orders | Ponno",
  description: "Track and manage your Ponno orders.",
};
const MyOrderPage = () => {
  return (
    <>
      <OrdersPageClient />
    </>
  );
};

export default MyOrderPage;
