import Image from "next/image";

export default function ProfileAvatar({ formData, onImageSelect }) {
  return (
    <div className="flex flex-col items-center">
      {/* Avatar with upload button */}
      <div className="relative">
        <div className="relative w-40 h-40">
          {formData.avatarSrc ? (
            <Image
              src={formData.avatarSrc}
              alt="Profile"
              fill
              className="rounded-full object-cover border-4 border-gray-100"
            />
          ) : (
            <div className="w-full h-full rounded-full border-4 border-gray-100 bg-gray-200 flex items-center justify-center">
              <span className="text-3xl font-semibold text-gray-500">
                {formData.firstName?.[0]}
                {formData.lastName?.[0]}
              </span>
            </div>
          )}
        </div>

        <label className="absolute bottom-2 right-2 cursor-pointer bg-black text-white p-2 rounded-full opacity-90 hover:opacity-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536M9 13l6.768-6.768a2.5 2.5 0 113.536 3.536L12.536 16.536a4 4 0 01-1.414.95L7 19l1.514-4.122A4 4 0 019 13z"
            />
          </svg>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageSelect}
          />
        </label>
      </div>

      {formData.pendingFile && (
        <p className="mt-2 text-xs text-gray-400">Unsaved photo</p>
      )}

      {/* Display name */}
      <h2 className="mt-5 text-2xl font-bold text-gray-900">
        {formData.firstName} {formData.lastName}
      </h2>

      {/* Member since card */}
      <div className="mt-6 w-full">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-500">Member Since</p>
          <p className="font-medium text-gray-900 mt-1">
            {formData.createdAt
              ? new Date(formData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
