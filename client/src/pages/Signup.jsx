import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, User } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { validateField } from "./../utils/utils";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const result = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        navigate("/dashboard");
      } else {
        setErrors((prev) => ({
          ...prev,
          submit: result.error,
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: "An unexpected error occurred",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (name, placeholder, type = "text", icon) => (
    <div className="relative">
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      {icon}
      <input
        id={name}
        name={name}
        type={type}
        required
        className={`input-field pl-10 ${errors[name] ? "border-red-500" : ""}`}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleChange}
        onBlur={() => {
          const error = validateField(name, formData[name], formData);
          if (error) {
            setErrors((prev) => ({
              ...prev,
              [name]: error,
            }));
          }
        }}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="card max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.submit && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              <p>{errors.submit}</p>
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            {renderInput(
              "firstName",
              "First Name",
              "text",
              <User className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
            )}
            {renderInput(
              "lastName",
              "Last Name",
              "text",
              <User className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
            )}
            {renderInput(
              "email",
              "Email address",
              "email",
              <Mail className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
            )}
            {renderInput(
              "password",
              "Password",
              "password",
              <Lock className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
            )}
            {renderInput(
              "confirmPassword",
              "Confirm Password",
              "password",
              <Lock className="absolute top-3 left-3 text-gray-400 h-5 w-5" />
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`btn-primary w-full flex justify-center items-center ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? <LoadingSpinner /> : "Create Account"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
