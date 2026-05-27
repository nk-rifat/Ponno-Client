import RegisterAnimation from "./RegisterAnimation";
import { Logo } from "@/components/shared/Logo";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden lg:flex relative items-center justify-center p-12 bg-gray-50">
        {/* Top-left Logo */}
        <div className="absolute top-6 left-6">
          <Logo />
        </div>

        {/* Animation */}
        <div className="absolute inset-0 opacity-60">
          <RegisterAnimation />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-gray-100">
        <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-2xl shadow-md">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-6 lg:hidden">
            <Logo />
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          </div>
          {/* <RegisterForm /> */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
