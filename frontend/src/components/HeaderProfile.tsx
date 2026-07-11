"use client";

import React, { useState, useRef, useEffect } from "react";

interface HeaderProfileProps {
  userEmail: string;
  logoutAction: () => Promise<void> | void;
}

export default function HeaderProfile({ userEmail, logoutAction }: HeaderProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = (email: string) => {
    if (!email) return "U";
    return email.split("@")[0].substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex items-center gap-4">
      {/* Right nav utilities matching reference image */}
      <span className="text-xs text-gray-500 hover:text-gray-900 cursor-pointer hidden md:inline font-medium">
        Subscription
      </span>
      
      <button className="text-gray-400 hover:text-gray-600 cursor-pointer p-1">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <button className="text-gray-400 hover:text-gray-600 cursor-pointer p-1">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </button>

      <button className="text-gray-400 hover:text-gray-600 cursor-pointer p-1">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>

      {/* Notification with Badge */}
      <button className="relative text-gray-400 hover:text-gray-600 cursor-pointer p-1">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-[10px] text-white rounded-full w-4.5 h-4.5 flex items-center justify-center border-2 border-white font-bold leading-none">
          3
        </span>
      </button>

      <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>

      {/* User profile dropdown anchor */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-8.5 h-8.5 rounded-full bg-indigo-600 text-white font-bold text-xs select-none hover:bg-indigo-700 cursor-pointer border border-indigo-200 shadow-sm focus:outline-none transition-all duration-200"
        >
          {getInitials(userEmail)}
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2.5 w-60 rounded-xl bg-white border border-gray-150 shadow-xl py-3 z-55 animate-fade-in-up text-left">
            <div className="px-4 py-2.5 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Signed in as</p>
              <p className="text-sm font-bold text-gray-800 truncate mt-0.5">{userEmail}</p>
            </div>
            
            <div className="px-4 py-2 border-b border-gray-100">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-[10px] text-emerald-700 border border-emerald-200/50 font-semibold">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Session
              </span>
            </div>

            <div className="py-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  logoutAction();
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
