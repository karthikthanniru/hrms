import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HeaderProfile from "@/components/HeaderProfile";
import ServicesGrid from "@/components/ServicesGrid";

// Server action to log out the user
async function logoutAction() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
  redirect("/login");
}

function decodeJwt(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    // Base64Url decode the payload (second part of JWT)
    const payload = parts[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedJson = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(decodedJson);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const decoded = token ? decodeJwt(token) : null;
  const userEmail = decoded?.sub || "";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f5f8fa]">
      {token && decoded ? (
        // REDESIGNED PORTAL VIEW (MATCHING ZOHO PEOPLE REFERENCE IMAGE)
        <div className="flex flex-col min-h-screen w-full text-gray-800">
          
          {/* Top Navigation Bar */}
          <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 z-30 sticky top-0 shadow-sm">
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-2">
              {/* Colorful circular dots logo matching the reference image */}
              <div className="grid grid-cols-2 gap-1.5 w-6 h-6 rotate-45">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-sm"></span>
              </div>
              <span className="text-xl font-extrabold tracking-tight font-outfit text-gray-800 ml-1.5">
                People
              </span>
            </div>

            {/* Center: Search Employee Input */}
            <div className="hidden sm:flex items-center justify-center flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search Employee"
                  className="w-full bg-[#f4f6f8] text-gray-700 placeholder-gray-400 text-sm pl-4 pr-10 py-2 rounded-full border border-gray-150 focus:outline-none focus:border-indigo-400 focus:bg-white transition-all duration-200"
                />
                <span className="absolute right-3.5 top-2.5 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Right: User menu, help, notifications */}
            <HeaderProfile userEmail={userEmail} logoutAction={logoutAction} />
          </header>

          {/* Core Layout: Sidebar + Main Content */}
          <div className="flex flex-1 relative">
            
            {/* Left Narrow Sidebar */}
            <aside className="w-20 bg-[#191e33] flex flex-col items-center py-4 border-r border-gray-800 text-gray-400 z-20 sticky top-16 h-[calc(100vh-4rem)]">
              {/* Services Item (Active) */}
              <div className="flex flex-col items-center justify-center w-full py-3 mb-1.5 cursor-pointer text-white border-l-3 border-blue-500 bg-blue-600/10">
                <svg className="w-5 h-5 text-blue-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span className="text-[10px] font-bold tracking-wide">Services</span>
              </div>

              {/* Home Item */}
              <div className="flex flex-col items-center justify-center w-full py-3 mb-1.5 cursor-pointer hover:text-white hover:bg-white/5 transition-colors">
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-[10px] font-medium tracking-wide">Home</span>
              </div>

              {/* Self-service Item */}
              <div className="flex flex-col items-center justify-center w-full py-3 mb-1.5 cursor-pointer hover:text-white hover:bg-white/5 transition-colors">
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-[10px] font-medium tracking-wide">Self-service</span>
              </div>

              {/* Leave Item */}
              <div className="flex flex-col items-center justify-center w-full py-3 mb-1.5 cursor-pointer hover:text-white hover:bg-white/5 transition-colors">
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[10px] font-medium tracking-wide">Leave</span>
              </div>

              {/* Timesheet Item */}
              <div className="flex flex-col items-center justify-center w-full py-3 mb-1.5 cursor-pointer hover:text-white hover:bg-white/5 transition-colors">
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[10px] font-medium tracking-wide">Timesheet</span>
              </div>

              {/* Attendance Item */}
              <div className="flex flex-col items-center justify-center w-full py-3 mb-1.5 cursor-pointer hover:text-white hover:bg-white/5 transition-colors">
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[10px] font-medium tracking-wide">Attendance</span>
              </div>

              {/* Performance Item */}
              <div className="flex flex-col items-center justify-center w-full py-3 mb-1.5 cursor-pointer hover:text-white hover:bg-white/5 transition-colors">
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[10px] font-medium tracking-wide">Performance</span>
              </div>

              {/* Cases Item */}
              <div className="flex flex-col items-center justify-center w-full py-3 mb-1.5 cursor-pointer hover:text-white hover:bg-white/5 transition-colors">
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="text-[10px] font-medium tracking-wide">Cases</span>
              </div>
            </aside>

            {/* Main Canvas View */}
            <main className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-4rem)]">
              {/* Dynamic services rendering list with filtering support */}
              <ServicesGrid />
            </main>
          </div>
        </div>
      ) : (
        // PUBLIC LANDING VIEW (UNAUTHENTICATED)
        <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 bg-[#09090b]">
          {/* Background ambient glows */}
          <div className="ambient-glow -top-40 -left-40 animate-pulse-slow"></div>
          <div className="ambient-glow -bottom-40 -right-40 animate-pulse-slow" style={{ animationDelay: "2s" }}></div>

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs text-muted-foreground border border-white/5 uppercase tracking-widest font-semibold mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Now Live: Version 1.0.0
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-outfit text-white mb-6 max-w-3xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              Modern Directory for your <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Enterprise Assets</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-2xl mb-10 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              A high-performance employee directory and administration hub powered by Next.js, Tailwind CSS, and distributed Java microservices. Secure, fast, and audit-ready.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <Link
                href="/login"
                className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg text-sm font-bold transition-all duration-300 transform active:scale-98 shadow-lg hover:shadow-indigo-500/20 hover:cursor-pointer flex items-center justify-center gap-2"
              >
                Sign In to Portal
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/register"
                className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-855 text-white rounded-lg text-sm font-bold border border-white/10 transition-all transform active:scale-98 hover:cursor-pointer flex items-center justify-center"
              >
                Register New Account
              </Link>
            </div>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <div className="glass-panel p-6 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-base">Secure Gateway</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Utilizes Spring Security filter chains and JSON Web Tokens. Cookie states are handled via HTTP-Only, SameSite, and secure attributes.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-base">Microservices Ready</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Decoupled backend services. Dedicated authorization node running independently from employee registers to optimize scaling.
                </p>
              </div>

              <div className="glass-panel p-6 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white text-base">Vibrant UI</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Fluid, modern layout styled with Tailwind CSS, supporting fast loads, elegant glassmorphic panels, and smooth micro-animations.
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer className="relative w-full max-w-7xl mx-auto px-4 py-8 border-t border-white/5 text-center text-xs text-muted-foreground z-10 mt-20">
              &copy; {new Date().getFullYear()} Employee Management System. All rights reserved.
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
