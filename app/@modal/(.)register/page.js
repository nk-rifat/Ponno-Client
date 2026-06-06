"use client";

import RegisterForm from "@/components/auth/register/RegisterForm";
import Modal from "@/components/shared/Modal";
import { useRouter } from "next/navigation";

export default function RegisterModal() {
  const router = useRouter();

  const handleSuccess = () => {
    router.back(); // closes modal, goes back to previous page
  };

  return (
    <Modal title="Register" onClose={() => router.back()}>
      <RegisterForm onSuccess={handleSuccess} />
    </Modal>
  );
}
