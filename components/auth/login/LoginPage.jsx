import { Logo } from "@/components/shared/Logo";
import LoginAnimation from "./LoginAnimation";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
      {/* Left Side */}
      <div className="hidden lg:flex relative items-center justify-center p-12 bg-gray-50 border-r border-gray-200 overflow-hidden">
        {/* Top-left Logo */}
        <div className="absolute top-6 left-6 z-20">
          <Logo />
        </div>

        {/* Animation */}
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <LoginAnimation />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg text-center flex flex-col items-center gap-6">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Welcome Back!
          </h1>

          <p className="text-slate-700 text-lg leading-relaxed">
            Sign in to continue exploring beautifully handcrafted products from
            talented local artisans.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-3xl shadow-lg">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-6 lg:hidden">
            <Logo />
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
          </div>

          {/* Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
