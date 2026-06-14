"use client";

import { useAuth } from "@/hooks/useAuth";
import { clearFullCart } from "@/store/cartSlice";
import axiosInstance from "@/lib/axiosInstance";
import { clearCheckout } from "@/store/checkoutSlice";
import { bdGeographicData } from "@/data/bangladeshGeo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import OrderSummary from "./OrderSummary";
import DeliveryForm from "./DeliveryForm";

const CheckoutClientPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { items, source } = useSelector((state) => state.checkout);
  const { user } = useAuth();

  // Active object references to compute dropdown structures
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      division_id: "",
      division_name: "",
      district_id: "",
      district_name: "",
      upazila_id: "",
      upazila_name: "",
      address: "",
      note: "",
    },
  });

  const watchedDistrictName = watch("district_name");

  // Inline array generation from local geographic asset file
  const divisions = bdGeographicData;
  const districts = selectedDivision ? selectedDivision.districts : [];
  const upazilas = selectedDistrict ? selectedDistrict.upazilas : [];

  const deliveryCharge = watchedDistrictName === "Dhaka" ? 120 : 150;
  const subtotal = items.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0,
  );
  const total = subtotal + (watchedDistrictName ? deliveryCharge : 0);

  // Guard: no items → go home
  useEffect(() => {
    if (items.length === 0) router.replace("/");
  }, [items, router]);

  // Pre-fill name
  useEffect(() => {
    if (user?.firstName) {
      setValue("name", `${user.firstName} ${user.lastName || ""}`.trim());
    }
  }, [user, setValue]);

  // Synchronous change handlers for top level cascading dropdowns
  const handleDivisionChange = (e) => {
    const targetId = e.target.value;
    const selected = divisions.find((d) => d.id === targetId);

    if (!selected) {
      setSelectedDivision(null);
      setSelectedDistrict(null);
      setValue("division_id", "");
      setValue("division_name", "");
    } else {
      setSelectedDivision(selected);
      setSelectedDistrict(null);
      setValue("division_id", selected.id, { shouldValidate: true });
      setValue("division_name", selected.name);
    }

    setValue("district_id", "");
    setValue("district_name", "");
    setValue("upazila_id", "");
    setValue("upazila_name", "");
  };

  const handleDistrictChange = (e) => {
    const targetId = e.target.value;
    const selected = districts.find((d) => d.id === targetId);

    if (!selected) {
      setSelectedDistrict(null);
      setValue("district_id", "");
      setValue("district_name", "");
    } else {
      setSelectedDistrict(selected);
      setValue("district_id", selected.id, { shouldValidate: true });
      setValue("district_name", selected.name);
    }

    setValue("upazila_id", "");
    setValue("upazila_name", "");
  };

  const handleUpazilaChange = (e) => {
    const targetId = e.target.value;
    const selected = upazilas.find((u) => u.id === targetId);

    if (!selected) {
      setValue("upazila_id", "");
      setValue("upazila_name", "");
    } else {
      setValue("upazila_id", selected.id, { shouldValidate: true });
      setValue("upazila_name", selected.name);
    }
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const payload = {
        items: items.map((item) => ({
          productId: item.productId || item._id,
          quantity: item.quantity,
        })),
        delivery: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          division: formData.division_name,
          zila: formData.district_name,
          upazila: formData.upazila_name,
          address: formData.address.trim(),
          note: formData.note.trim(),
        },
      };
      const res = await axiosInstance.post("/api/orders", payload);

      if (res.data.success) {
        dispatch(clearCheckout());
        if (source === "cart") dispatch(clearFullCart());
        await Swal.fire({
          icon: "success",
          title: "Order placed!",
          text: "We will review and confirm your order shortly.",
          confirmButtonText: "OK",
        });
        router.push("/orders/my-orders");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Failed to place order. Please try again.";
      Swal.fire({ icon: "error", title: "Error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-emerald-800 mb-1">Checkout</h1>
      <p className="text-sm text-gray-600 mb-6">
        Review your order and fill in delivery details
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrderSummary
            items={items}
            watchedDistrictName={watchedDistrictName}
            deliveryCharge={deliveryCharge}
            subtotal={subtotal}
            total={total}
            register={register}
          />
          <DeliveryForm
            register={register}
            errors={errors}
            watch={watch}
            loading={loading}
            divisions={divisions}
            districts={districts}
            upazilas={upazilas}
            loadingDistrict={false}
            loadingUpazila={false}
            handleDivisionChange={handleDivisionChange}
            handleDistrictChange={handleDistrictChange}
            handleUpazilaChange={handleUpazilaChange}
          />
        </div>
      </form>
    </div>
  );
};

export default CheckoutClientPage;
