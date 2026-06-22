"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

import { FaArrowLeft, FaHospital, FaMapMarkerAlt, FaMedal, FaUsers, FaStar, FaCreditCard, FaClock, FaCircle, FaUser, FaPhone, FaCalendarAlt, FaClipboardList, FaCheckCircle, FaTimes } from "react-icons/fa";

const SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "04:00 PM", "05:00 PM", "06:00 PM"];

export default function DoctorClient({ doctor }) {
  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email;

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    reason: "",
  });

  const [imgSrc, setImgSrc] = useState(
    doctor.image || "https://i.pravatar.cc/300?img=47"
  );

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedSlot) {
      return alert("Please select a time slot.");
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: doctor._id,
          doctorName: doctor.name,
          doctorImage: doctor.image,
          specialty: doctor.specialty,
          fee: doctor.fee,
          email: userEmail,
          name: form.name,
          phone: form.phone,
          date: form.date,
          slot: selectedSlot,
          reason: form.reason,
          status: "pending",
          createdAt: new Date(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Booking failed");
      }

      toast.success("Appointment booked successfully 🎉");
      setSubmitted(true);
    } catch (error) {
      toast.error("Booking failed: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setModalOpen(false);
    setSubmitted(false);
    setSelectedSlot(null);
    setForm({ name: "", phone: "", date: "", reason: "" });
  }

  const stats = [
    { label: "Experience", value: doctor.experience ?? "N/A", icon: <FaMedal className="text-xl text-cyan-600" /> },
    { label: "Patients", value: "2,400+", icon: <FaUsers className="text-xl text-cyan-600" /> },
    { label: "Rating", value: "4.9 / 5", icon: <FaStar className="text-xl text-cyan-600" /> },
    { label: "Consult Fee", value: doctor.fee ? `৳${doctor.fee}` : "N/A", icon: <FaCreditCard className="text-xl text-cyan-600" /> },
  ];

  const availability = Array.isArray(doctor.availability) ? doctor.availability : [];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 container mx-auto">

      {/* ── HERO CARD ── */}
      <main className="max-w-[1100px] mx-auto my-10 px-6">
        <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(8,145,178,0.10)] flex flex-wrap gap-12 p-10">

          {/* Left */}
          <div className="flex-shrink-0">
            <div className="relative w-[220px]">
              <Link
                href="/all-appointments"
                className="flex items-center gap-3 mb-10 text-cyan-600 font-medium hover:text-cyan-700"
              >
                <FaArrowLeft /> Back to Appointments
              </Link>

              <Image
                src={imgSrc}
                alt={doctor.name}
                width={220}
                height={260}
                className="w-[220px] h-[260px] object-cover rounded-2xl block bg-slate-100"
                onError={() => setImgSrc("https://i.pravatar.cc/300?img=47")}
              />

              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                <FaCircle className="text-[8px]" /> Available
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 min-w-[280px]">
            <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-1.5">
              {doctor.specialty}
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight mb-4">
              {doctor.name}
            </h1>

            <div className="flex flex-wrap gap-2.5 mb-4.5">
              {doctor.hospital && (
                <span className="bg-slate-100 text-slate-700 text-xs px-3.5 py-1.5 rounded-full font-medium flex items-center gap-1.5">
                  <FaHospital className="text-cyan-500" /> {doctor.hospital}
                </span>
              )}
              {doctor.location && (
                <span className="bg-slate-100 text-slate-700 text-xs px-3.5 py-1.5 rounded-full font-medium flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-cyan-500" /> {doctor.location}
                </span>
              )}
            </div>

            {doctor.description && (
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {doctor.description}
              </p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {stats.map((st) => (
                <div
                  key={st.label}
                  className="bg-cyan-50 rounded-xl p-3.5 flex flex-col items-center gap-1"
                >
                  {st.icon}
                  <span className="text-base font-bold text-cyan-800">{st.value}</span>
                  <span className="text-[11px] text-slate-500 font-medium">{st.label}</span>
                </div>
              ))}
            </div>

            {/* Availability */}
            {availability.length > 0 && (
              <div className="mb-7">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Availability
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {availability.map((slot) => (
                    <span
                      key={slot}
                      className="bg-cyan-50 text-cyan-800 text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5"
                    >
                      <FaClock className="text-cyan-500" /> {slot}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setModalOpen(true)}
              className="bg-cyan-600 text-white border-none rounded-xl px-9 py-3.5 text-sm font-bold shadow-[0_4px_14px_rgba(8,145,178,0.35)] hover:bg-cyan-700 transition"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </main>

      {/* ── MODAL ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-slate-900/55 flex items-center justify-center z-[100] p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-[20px] w-full max-w-[520px] max-h-[90vh] overflow-y-auto p-8 shadow-[0_24px_60px_rgba(0,0,0,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="text-center py-4">
                <FaCheckCircle className="text-[56px] text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-extrabold mb-3">Appointment Booked!</h2>
                <p className="text-slate-700 text-sm leading-relaxed mb-2">
                  Your appointment with <strong>{doctor.name}</strong> is confirmed for{" "}
                  <strong>{form.date}</strong> at <strong>{selectedSlot}</strong>.
                </p>
                <button
                  className="bg-cyan-600 text-white rounded-xl px-10 py-3 text-sm font-bold hover:bg-cyan-700"
                  onClick={closeModal}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-extrabold">Book Appointment</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {doctor.name} · {doctor.specialty}
                    </p>
                  </div>

                  <button
                    className="bg-slate-100 rounded-lg w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-200"
                    onClick={closeModal}
                  >
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Full Name */}
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                      <input
                        className="border rounded-lg pl-8 pr-3 py-2 text-sm w-full"
                        placeholder="Full Name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                      <input
                        className="border rounded-lg pl-8 pr-3 py-2 text-sm w-full"
                        placeholder="Phone"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                      type="date"
                      className="border rounded-lg pl-8 pr-3 py-2 text-sm w-full"
                      required
                      value={form.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>

                  {/* Time Slots */}
                  <div className="grid grid-cols-3 gap-2">
                    {SLOTS.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`text-xs p-2 rounded border flex items-center justify-center gap-1.5 ${selectedSlot === slot
                          ? "bg-cyan-100 border-cyan-500 text-cyan-700"
                          : "bg-slate-100 text-slate-600"
                          }`}
                      >
                        <FaClock className="text-[10px]" /> {slot}
                      </button>
                    ))}
                  </div>

                  {/* Reason */}
                  <div className="relative">
                    <FaClipboardList className="absolute left-3 top-3 text-slate-400 text-xs" />
                    <textarea
                      className="border rounded-lg pl-8 pr-3 py-2 text-sm w-full"
                      placeholder="Reason (optional)"
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-cyan-600 text-white rounded-xl py-3 font-bold disabled:opacity-60"
                  >
                    {loading ? "Booking..." : "Confirm Booking"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}