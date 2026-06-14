"use client";

const LocationSelects = ({
  register,
  errors,
  divisions,
  districts,
  upazilas,
  handleDivisionChange,
  handleDistrictChange,
  handleUpazilaChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Responsive Flex Container for Division & District */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Division */}
        <div className="flex-1">
          <label className="text-sm text-gray-500 mb-1.5 block">
            Division <span className="text-red-400">*</span>
          </label>
          <select
            {...register("division_id", { required: "Division is required" })}
            onChange={handleDivisionChange}
            className={`w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none transition-colors
              ${errors.division_id ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-gray-400"}`}
          >
            <option value="">Select Division</option>
            {divisions.map((div) => (
              <option key={div.id} value={div.id}>
                {div.name}
              </option>
            ))}
          </select>
          {errors.division_id && (
            <p className="text-xs text-red-400 mt-1">{errors.division_id.message}</p>
          )}
        </div>

        {/* District / Zila */}
        <div className="flex-1">
          <label className="text-sm text-gray-500 mb-1.5 block">
            District <span className="text-red-400">*</span>
          </label>
          <select
            {...register("district_id", { required: "District is required" })}
            onChange={handleDistrictChange}
            disabled={districts.length === 0}
            className={`w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-400
              ${errors.district_id ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-gray-400"}`}
          >
            <option value="">Select District</option>
            {districts.map((dis) => (
              <option key={dis.id} value={dis.id}>
                {dis.name}
              </option>
            ))}
          </select>
          {errors.district_id && (
            <p className="text-xs text-red-400 mt-1">{errors.district_id.message}</p>
          )}
        </div>
      </div>

      {/* Upazila sits here - its row pairing with Address is handled in the parent form */}
      <div>
        <label className="text-sm text-gray-500 mb-1.5 block">
          Upazila <span className="text-red-400">*</span>
        </label>
        <select
          {...register("upazila_id")}
          onChange={handleUpazilaChange}
          disabled={upazilas.length === 0}
          className={`w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-400
            ${errors.upazila_id ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-gray-400"}`}
        >
          <option value="">Select Upazila</option>
          {upazilas.map((up) => (
            <option key={up.id} value={up.id}>
              {up.name}
            </option>
          ))}
        </select>
        {errors.upazila_id && (
          <p className="text-xs text-red-400 mt-1">{errors.upazila_id.message}</p>
        )}
      </div>
    </div>
  );
};

export default LocationSelects;