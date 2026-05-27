"use client";

import Field from "@/components/shared/Field";
import Link from "next/link";
import { useState } from "react";
import { CgPassword } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const [show, setShow] = useState(false);

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-300 shadow-sm transition-shadow mt-1";
  return (
    <form className="space-y-4 pb-10">
      {/* First Name */}
      <Field label="First Name">
        <input
          type="text"
          placeholder="Enter your First Name"
          className={inputStyle}
        />
      </Field>

      {/* Last Name */}
      <Field label="Last Name">
        <input
          type="text"
          placeholder="Enter your Last Name"
          className={inputStyle}
        />
      </Field>

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
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            placeholder="••••••••"
            className={`${inputStyle} pr-10`}
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

      {/* Button */}
      <div className="pt-2">
        <button
          type="button"
          className="w-full px-4 py-3 rounded-xl bg-green-600 text-white font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/30 active:bg-green-800 transition-shadow"
        >
          Register
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
