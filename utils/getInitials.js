export const getInitials = (name = "") => {
  if (!name || typeof name !== "string") return "??";

  return (
    name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("") || "??"
  );
};
