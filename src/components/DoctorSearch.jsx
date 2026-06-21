"use client";
import { useState } from "react";
import { Input } from "@heroui/react";
import AppointmentCard from "@/components/AppointmentCard";

const DoctorSearch = ({ appointments = [] }) => {
      const [search, setSearch] = useState("");

      const filtered = appointments.filter((doc) =>
            doc.name.toLowerCase().includes(search.toLowerCase())
      );

      return (
            <>
                  {/* Search Bar */}
                  <div className="max-w-full mb-10">
                        <h1 className="text-xl font-bold mb-4">Search Doctors</h1>
                        <Input
                              type="text"
                              placeholder="Search doctor by name..."
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              startContent={
                                    <svg
                                          className="w-4 h-4 text-gray-400"
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                                          />
                                    </svg>
                              }
                              endContent={
                                    search && (
                                          <button
                                                onClick={() => setSearch("")}
                                                className="text-gray-400 hover:text-gray-600 text-sm"
                                          >
                                                ✕
                                          </button>
                                    )
                              }
                              classNames={{
                                    base: "w-full",
                                    inputWrapper:
                                          "rounded-full border border-gray-300 shadow-sm bg-white px-4",
                              }}
                        />

                        {/* Result count */}
                        {search && (
                              <p className="text-sm text-gray-500 mt-2 text-center">
                                    {filtered.length} doctor{filtered.length !== 1 ? "s" : ""} found
                                    for{" "}
                                    <span className="font-semibold text-blue-600">"{search}"</span>
                              </p>
                        )}
                  </div>

                  {/* Grid or Empty State */}
                  {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {filtered.map((appointment) => (
                                    <AppointmentCard key={appointment._id} appointment={appointment} />
                              ))}
                        </div>
                  ) : (
                        <div className="text-center mt-20 text-gray-400">
                              <svg
                                    className="mx-auto w-12 h-12 mb-3 text-gray-300"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                              >
                                    <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={1.5}
                                          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                                    />
                              </svg>
                              <p className="text-lg font-medium">No doctors found</p>
                              <p className="text-sm mt-1">Try searching with a different name</p>
                        </div>
                  )}
            </>
      );
};

export default DoctorSearch;