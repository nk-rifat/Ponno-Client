"use client";

import LocationSelects from "./LocationSelects";

const DeliveryForm = ({
  register,
  errors,
  watch,
  loading,
  divisions,
  districts,
  upazilas,
  handleDivisionChange,
  handleDistrictChange,
  handleUpazilaChange,
}) => {
  return (
    <div>
      <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-3">
        Delivery details
      </p>
      <div className="border border-emerald-100 rounded-xl bg-white p-5 space-y-4">
        {/* Name + Phone */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">
              Full name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              readOnly
              placeholder="Your full name"
              {...register("name", { required: "Name is required" })}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors
                ${errors.name ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-gray-400"}`}
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1.5 block">
              Phone <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^(?:\+88)?01[3-9]\d{8}$/,
                  message: "Enter a valid BD phone number",
                },
              })}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors
                ${errors.phone ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-gray-400"}`}
            />
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Location dropdowns */}
        <LocationSelects
          register={register}
          errors={errors}
          watch={watch}
          divisions={divisions}
          districts={districts}
          upazilas={upazilas}
          handleDivisionChange={handleDivisionChange}
          handleDistrictChange={handleDistrictChange}
          handleUpazilaChange={handleUpazilaChange}
        />

        {/* Address */}
        <div>
          <label className="text-xs text-gray-500 mb-1.5 block">
            Union & village address <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="House no., road, para / moholla"
            {...register("address", { required: "Address is required" })}
            className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors
              ${errors.address ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-gray-400"}`}
          />
          {errors.address && (
            <p className="text-xs text-red-400 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-2.5 bg-blue-50 rounded-lg p-3">
          <svg
            className="w-4 h-4 text-blue-500 mt-0.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z"
            />
          </svg>
          <p className="text-xs text-blue-600 leading-relaxed">
            No online payment required. Our team will contact you after
            confirming your order.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-emerald-600 text-white text-sm font-medium  rounded-lg hover:bg-emerald-800 active:bg-gray-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              Placing order...
            </>
          ) : (
            <>Place order</>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeliveryForm;
