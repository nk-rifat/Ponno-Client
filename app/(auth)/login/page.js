import LoginPage from "@/components/auth/login/LoginPage";
export const metadata = {
  title: "Login | Ponno",
  description:
    "Login to your Ponno account to shop handcrafted bamboo, cane, and jute products.",
};

const page = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default page;
