import React from "react";

export interface ServiceItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  bgColor: string; // Background circle color
  glowColor: string; // Shadow glow color
  iconColor: string;
}

export const services: ServiceItem[] = [
  {
    id: "performance",
    title: "Performance",
    bgColor: "bg-amber-50",
    glowColor: "shadow-amber-500/10 hover:shadow-amber-500/20 hover:border-amber-200",
    iconColor: "text-amber-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "organization",
    title: "Organization",
    bgColor: "bg-emerald-50",
    glowColor: "shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:border-emerald-200",
    iconColor: "text-emerald-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.252.58 1.808l-3.97 2.887a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.887a1 1 0 00-1.175 0l-3.97 2.887c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.97-2.887c-.765-.556-.37-1.808.579-1.808h4.907a1 1 0 00.95-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    id: "attendance",
    title: "Attendance",
    bgColor: "bg-sky-50",
    glowColor: "shadow-sky-500/10 hover:shadow-sky-500/20 hover:border-sky-200",
    iconColor: "text-sky-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "leave-tracker",
    title: "Leave Tracker",
    bgColor: "bg-teal-50",
    glowColor: "shadow-teal-500/10 hover:shadow-teal-500/20 hover:border-teal-200",
    iconColor: "text-teal-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "time-tracker",
    title: "Time Tracker",
    bgColor: "bg-orange-50",
    glowColor: "shadow-orange-500/10 hover:shadow-orange-500/20 hover:border-orange-200",
    iconColor: "text-orange-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "approvals",
    title: "Approvals",
    bgColor: "bg-indigo-50",
    glowColor: "shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:border-indigo-200",
    iconColor: "text-indigo-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "files",
    title: "Files",
    bgColor: "bg-blue-50",
    glowColor: "shadow-blue-500/10 hover:shadow-blue-500/20 hover:border-blue-200",
    iconColor: "text-blue-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "onboarding",
    title: "Onboarding",
    bgColor: "bg-red-50",
    glowColor: "shadow-red-500/10 hover:shadow-red-500/20 hover:border-red-200",
    iconColor: "text-red-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: "cases",
    title: "Cases",
    bgColor: "bg-purple-50",
    glowColor: "shadow-purple-500/10 hover:shadow-purple-500/20 hover:border-purple-200",
    iconColor: "text-purple-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    id: "lms",
    title: "LMS",
    bgColor: "bg-cyan-50",
    glowColor: "shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-200",
    iconColor: "text-cyan-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  },
  {
    id: "announcements",
    title: "Announcements",
    bgColor: "bg-rose-50",
    glowColor: "shadow-rose-500/10 hover:shadow-rose-500/20 hover:border-rose-200",
    iconColor: "text-rose-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    id: "letters",
    title: "Letters",
    bgColor: "bg-pink-50",
    glowColor: "shadow-pink-500/10 hover:shadow-pink-500/20 hover:border-pink-200",
    iconColor: "text-pink-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "employee-engagement",
    title: "Engagement",
    bgColor: "bg-violet-50",
    glowColor: "shadow-violet-500/10 hover:shadow-violet-500/20 hover:border-violet-200",
    iconColor: "text-violet-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: "transport-request",
    title: "Transport",
    bgColor: "bg-fuchsia-50",
    glowColor: "shadow-fuchsia-500/10 hover:shadow-fuchsia-500/20 hover:border-fuchsia-200",
    iconColor: "text-fuchsia-500",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    id: "office-readiness",
    title: "Readiness",
    bgColor: "bg-indigo-50",
    glowColor: "shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:border-indigo-200",
    iconColor: "text-indigo-600",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "compensation",
    title: "Compensation",
    bgColor: "bg-emerald-50",
    glowColor: "shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:border-emerald-200",
    iconColor: "text-emerald-600",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "taxi",
    title: "Taxi",
    bgColor: "bg-yellow-50",
    glowColor: "shadow-yellow-500/10 hover:shadow-yellow-500/20 hover:border-yellow-200",
    iconColor: "text-yellow-600",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17a5 5 0 0110 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2v-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9V3m0 0L9 6m3-3l3 3" />
      </svg>
    ),
  },
  {
    id: "exit-module",
    title: "Exit Module",
    bgColor: "bg-slate-50",
    glowColor: "shadow-slate-500/10 hover:shadow-slate-500/20 hover:border-slate-300",
    iconColor: "text-slate-600",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
  },
];
