"use client";

import LoginForm from "@/components/auth/login/LoginForm";
import Modal from "@/components/shared/Modal";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const router = useRouter();

  const handleSuccess = () => {
    router.back(); // closes modal, goes back to previous page
  };

  return (
    <Modal title="Login" onClose={() => router.back()}>
      <LoginForm onSuccess={handleSuccess} />
    </Modal>
  );
}
