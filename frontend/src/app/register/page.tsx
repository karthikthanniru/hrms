"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "EMPLOYEE",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiResponse({ status: "idle", message: "" });

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const text = await response.text();

      if (response.ok) {
        setApiResponse({
          status: "success",
          message: text || "Registration successful! Redirecting to login...",
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        // Try parsing as JSON error, fallback to raw text
        let errorMsg = text;
        try {
          const json = JSON.parse(text);
          errorMsg = json.message || errorMsg;
        } catch {
          // Response is plain text
        }
        setApiResponse({
          status: "error",
          message: errorMsg || "Registration failed. Please check details.",
        });
      }
    } catch (err) {
      console.error("Register Error:", err);
      setApiResponse({
        status: "error",
        message: "Unable to connect to the authentication service. Please ensure the backend is running.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden bg-background">
      {/* Background ambient glows */}
      <div className="ambient-glow -top-40 -left-40 animate-pulse-slow"></div>
      <div className="ambient-glow -bottom-40 -right-40 animate-pulse-slow" style={{ animationDelay: "2s" }}></div>

      <div className="relative w-full max-w-lg z-10 animate-fade-in-up">
        {/* Decorative badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs text-muted-foreground border border-white/5 uppercase tracking-widest font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            Employee Management Portal
          </div>
        </div>

        <div className="w-full rounded-2xl glass-panel p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Card Border glow */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-outfit text-white mb-2">
              Create an Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign up to access the employee dashboard and tools
            </p>
          </div>

          {/* Success / Error Messages */}
          {apiResponse.status === "success" && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{apiResponse.message}</span>
            </div>
          )}

          {apiResponse.status === "error" && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive-foreground text-sm flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{apiResponse.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-lg text-sm text-white glass-input ${
                  errors.name ? "border-destructive/50 focus:border-destructive/80 focus:box-shadow-destructive" : ""
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive-foreground font-medium">{errors.name}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@company.com"
                className={`w-full px-4 py-3 rounded-lg text-sm text-white glass-input ${
                  errors.email ? "border-destructive/50 focus:border-destructive/80 focus:box-shadow-destructive" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive-foreground font-medium">{errors.email}</p>
              )}
            </div>

            {/* Role selection */}
            <div>
              <label htmlFor="role" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Assign System Role
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg text-sm text-white glass-input appearance-none cursor-pointer bg-neutral-900/90"
                >
                  <option value="EMPLOYEE" className="bg-neutral-900 text-white">Employee (Standard Access)</option>
                  <option value="MANAGER" className="bg-neutral-900 text-white">Manager (Approver Access)</option>
                  <option value="ADMIN" className="bg-neutral-900 text-white">Administrator (Full Control)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errors.role && (
                <p className="mt-1 text-xs text-destructive-foreground font-medium">{errors.role}</p>
              )}
            </div>

            {/* Passwords grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg text-sm text-white glass-input ${
                    errors.password ? "border-destructive/50 focus:border-destructive/80" : ""
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-destructive-foreground font-medium">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg text-sm text-white glass-input ${
                    errors.confirmPassword ? "border-destructive/50 focus:border-destructive/80" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-destructive-foreground font-medium">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full mt-2 py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm rounded-lg transition-all duration-300 transform active:scale-[0.98] shadow-lg hover:shadow-indigo-500/25 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Navigation to Login */}
          <div className="mt-8 text-center border-t border-white/5 pt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:text-indigo-400 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
