"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiResponse({ status: "idle", message: "" });

    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const text = await response.text();

      if (response.ok) {
        setApiResponse({
          status: "success",
          message:
            text ||
            "A password reset link has been sent to your email. Please check your inbox.",
        });
      } else {
        let errorMsg = text;
        try {
          const json = JSON.parse(text);
          errorMsg = json.message || errorMsg;
        } catch {
          // Plain text response
        }
        setApiResponse({
          status: "error",
          message: errorMsg || "Failed to send reset email. Please try again.",
        });
      }
    } catch (err) {
      console.error("Forgot Password Error:", err);
      setApiResponse({
        status: "error",
        message:
          "Unable to connect to the authentication service. Please ensure the backend is running.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden bg-background">
      {/* Background ambient glows */}
      <div className="ambient-glow -top-40 -left-40 animate-pulse-slow"></div>
      <div
        className="ambient-glow -bottom-40 -right-40 animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative w-full max-w-md z-10 animate-fade-in-up">
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

          {/* Mail icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-outfit text-white mb-2">
              Forgot Password?
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No worries! Enter your registered email address and we&apos;ll
              send you a secure reset link.
            </p>
          </div>

          {/* Success Message */}
          {apiResponse.status === "success" && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-start gap-3">
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <div>
                <p className="font-medium">Reset email sent!</p>
                <p className="mt-1 text-emerald-400/80">{apiResponse.message}</p>
                <p className="mt-2 text-xs text-emerald-500/60">
                  Didn&apos;t receive it? Check your spam folder or try again.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {apiResponse.status === "error" && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive-foreground text-sm flex items-center gap-3">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{apiResponse.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                placeholder="john.doe@company.com"
                disabled={apiResponse.status === "success"}
                className={`w-full px-4 py-3 rounded-lg text-sm text-white glass-input ${
                  emailError
                    ? "border-destructive/50 focus:border-destructive/80"
                    : ""
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {emailError && (
                <p className="mt-1 text-xs text-destructive-foreground font-medium">
                  {emailError}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || apiResponse.status === "success"}
              className="relative w-full py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm rounded-lg transition-all duration-300 transform active:scale-[0.98] shadow-lg hover:shadow-indigo-500/25 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending Reset Link...
                </>
              ) : apiResponse.status === "success" ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Email Sent
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* Navigation back to Login */}
          <div className="mt-8 text-center border-t border-white/5 pt-6 text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-indigo-400 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
