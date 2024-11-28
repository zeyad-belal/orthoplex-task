export function getAuthHeaders() {
  const token = Cookies.get("token");
  return {
    Authorization: `${token}`,
  };
}

export const validateField = (name, value , formData) => {
  switch (name) {
    case "firstName":
    case "lastName":
      if (value.length < 3) return "Must be at least 3 characters";
      if (value.length > 20) return "Must be less than 20 characters";
      break;
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Invalid email address";
      break;
    case "password":
      if (value.length < 6) return "Must be at least 6 characters";
      if (value.length > 20) return "Must be less than 20 characters";
      break;
    case "confirmPassword":
      if (value !== formData.password) return "Passwords do not match";
      break;
    default:
      return "";
  }
  return "";
};
