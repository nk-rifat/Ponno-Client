const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// REGISTER USER
export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

// Register Email verify
export const verifyEmail = async (token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-email?token=${token}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();

  return data;
};
