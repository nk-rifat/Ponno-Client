import CartPageClient from "@/components/cart/CartPageClient";
import React from "react";

export const metadata = {
  title: "Cart | Ponno",
  description:
    "Review your selected handcrafted products and proceed to checkout.",
};

const CartPage = async () => {
  return <CartPageClient />;
};

export default CartPage;
