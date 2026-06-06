"use client";

import Link from "next/link";
import Field from "@/components/shared/Field";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const buttonStyle =
  "w-full px-4 py-3 rounded-xl bg-green-600 text-white font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/30 active:bg-green-800 transition-colors transition-shadow";

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm();

  const submitForm = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await login(payload);

      if (res && res.id) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          timer: 1000,
          showConfirmButton: false,
        });
        onSuccess?.();
        const params = new URLSearchParams(window.location.search);
        const next = params.get("next") || "/";

        router.push(next);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: res?.data?.message || "Please try again",
        });
      }
    } catch (err) {
      // React Hook Form server error
      setError("root.serverError", {
        type: "server",
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      {/* Email */}
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Enter your email"
          className={`input-style ${errors.email ? "input-error" : ""}`}
        />
      </Field>

      {/* Password */}
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters ",
            },
          })}
          type="password"
          placeholder="••••••••"
          className={`input-style ${errors.password ? "input-error" : ""}`}
        />
      </Field>

      {errors?.root?.serverError && (
        <p className="text-red-500 text-sm">
          {errors.root.serverError.message}
        </p>
      )}

      {/* Forgot Password */}
      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-green-600 hover:text-green-700 transition-colors"
        >
          Forgot password?
        </button>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button disabled={isSubmitting} type="submit" className={buttonStyle}>
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </div>

      {/* Register Link */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-green-600 hover:text-green-700 underline underline-offset-4 transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
