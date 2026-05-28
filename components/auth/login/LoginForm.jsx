"use client";

import Link from "next/link";
import Field from "@/components/shared/Field";

const inputStyle =
  "w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 shadow-sm transition-colors transition-shadow";

const buttonStyle =
  "w-full px-4 py-3 rounded-xl bg-green-600 text-white font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/30 active:bg-green-800 transition-colors transition-shadow";

const LoginForm = () => {
  return (
    <form className="space-y-4">
      {/* Email */}
      <Field label="Email">
        <input
          type="email"
          placeholder="Enter your email"
          className={inputStyle}
        />
      </Field>

      {/* Password */}
      <Field label="Password">
        <input type="password" placeholder="••••••••" className={inputStyle} />
      </Field>

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
        <button type="submit" className={buttonStyle}>
          Sign In
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
