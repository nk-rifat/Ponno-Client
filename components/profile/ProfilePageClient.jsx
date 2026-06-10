"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { getMe, updateMe, uploadToCloudinary } from "@/lib/api/user";
import ProfileAvatar from "./ProfileAvatar";
import ProfileForm from "./ProfileForm";
import { useAuth } from "@/hooks/useAuth";

// Reusable SweetAlert2 toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default function ProfilePageClient() {
  const router = useRouter();
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMe()
      .then((user) => {
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: user.createdAt,
          avatarSrc: user.profilePic || null,
          pendingFile: null,
        });
      })
      .catch(() => router.push("/login"));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      avatarSrc: URL.createObjectURL(file),
      pendingFile: file,
    }));
  }

  async function handleSave() {
    if (!formData.firstName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "First name cannot be empty.",
        confirmButtonColor: "#111827",
      });
      return;
    }

    setLoading(true);

    try {
      let profilePic = null;

      if (formData.pendingFile) {
        profilePic = await uploadToCloudinary(formData.pendingFile);
      }

      const updatedUser = await updateMe({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        ...(profilePic && { profilePic }),
      });

      setFormData({
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        createdAt: updatedUser.createdAt,
        avatarSrc: updatedUser.profilePic || null,
        pendingFile: null,
      });
      updateUser(updatedUser);
      Toast.fire({
        icon: "success",
        title: "Changes saved!",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err.message || "Please try again.",
        confirmButtonColor: "#111827",
      });
    } finally {
      setLoading(false);
    }
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side — Avatar */}
            <div className="lg:w-1/3 p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
              <ProfileAvatar
                formData={formData}
                onImageSelect={handleImageSelect}
              />
            </div>

            {/* Right Side — Form */}
            <div className="lg:w-2/3 p-8">
              <ProfileForm
                formData={formData}
                onChange={handleChange}
                onSave={handleSave}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
