"use client";

import Field from "@/components/shared/Field";
import { registerUser } from "@/lib/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const RegisterForm = ({ onSuccess }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm();

  const submitForm = async (data) => {
    try {
      const res = await registerUser(data);
      onSuccess?.();

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: res.message || "Please verify your email.",
      });

      router.push("/login");
    } catch (error) {
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
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4 pb-10">
      {/* First Name */}
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", { required: "First Name is Required" })}
          type="text"
          placeholder="Enter your First Name"
          className={`input-style ${errors.firstName ? "input-error" : ""}`}
        />
      </Field>

      {/* Last Name */}
      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName", { required: "Last Name is Required" })}
          type="text"
          placeholder="Enter your Last Name"
          className={`input-style ${errors.lastName ? "input-error" : ""}`}
        />
      </Field>

      {/* Email */}
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email is Required" })}
          type="email"
          placeholder="Enter your email"
          className={`input-style ${errors.email ? "input-error" : ""}`}
        />
      </Field>

      {/* Password */}
      <Field label="Password" error={errors.password}>
        <div className="relative">
          <input
            {...register("password", {
              required: "Password is Required",
              minLength: {
                value: 8,
                message: "Your password must be at least 8 characters ",
              },
            })}
            type={show ? "text" : "password"}
            placeholder="••••••••"
            className={`input-style ${errors.password ? "input-error" : ""}`}
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </Field>

      {errors?.root?.serverError && (
        <p className="text-red-500 text-sm">
          {errors.root.serverError.message}
        </p>
      )}

      {/* Button */}
      <div className="pt-2">
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full px-4 py-3 rounded-xl bg-green-600 text-white font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/30 active:bg-green-800 transition-shadow"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </div>

      {/* Divider */}
      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
      </div>

      {/* Login link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-600 hover:text-green-700 underline underline-offset-4"
          >
            Login your account
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
