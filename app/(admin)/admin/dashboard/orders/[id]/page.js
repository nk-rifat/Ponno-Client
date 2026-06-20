import OrderDetailClient from "@/components/admin/orders/detail/OrderDetailClient";

export const metadata = { title: "Order Details – Ponno Admin" };

const OrderDetailPage = async ({ params }) => {
  const { id } = await params;
  return <OrderDetailClient orderId={id} />;
};

export default OrderDetailPage;
