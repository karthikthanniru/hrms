"use client";

import React, { useState } from "react";
import { services } from "@/constants/services";

export default function ServicesGrid() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Title Bar matching reference image */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-5 mb-8">
        <h2 className="text-xl font-bold text-gray-800 font-outfit">
          All Services
        </h2>
        
        <div className="flex items-center gap-3">
          {/* Inner service search box matching reference image */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Service"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-1.5 w-60 rounded-md border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
            />
            <span className="absolute left-2.5 top-2.5 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>

          <button className="p-2 rounded-md border border-gray-200 bg-white text-gray-500 hover:text-gray-700 cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`flex flex-col items-center justify-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${service.glowColor}`}
          >
            {/* Circle wrapper with colorful glowing border-shadow */}
            <div className={`w-14 h-14 rounded-full ${service.bgColor} ${service.iconColor} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105 shadow-inner`}>
              {service.icon}
            </div>
            
            <span className="text-sm font-semibold text-gray-700 text-center font-outfit truncate w-full">
              {service.title}
            </span>
          </div>
        ))}

        {/* Dynamic "Create New Service" Card */}
        {searchQuery === "" && (
          <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl border border-dashed border-gray-200 shadow-sm hover:border-emerald-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-400 to-green-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-emerald-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            
            <span className="text-sm font-bold text-emerald-600 text-center font-outfit">
              Create New Service
            </span>
          </div>
        )}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm font-medium text-gray-500">No matching services found</p>
        </div>
      )}
    </div>
  );
}
