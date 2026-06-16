"use client";
import { getCustomers } from "@/lib/api/customers";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const LIMIT = 10;

const CustomersTable = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: LIMIT };
      if (search) params.search = search;
      if (status !== "all") params.status = status;

      const { users, total, totalPages } = await getCustomers(params);
      setCustomers(users);
      setTotal(total);
      setTotalPage(totalPages);
    } catch {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to fetch customers",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    const delay = setTimeout(fetchCustomers, 400);

    return () => clearTimeout(delay);
  }, [fetchCustomers]);
  return <div>customer table</div>;
};

export default CustomersTable;
