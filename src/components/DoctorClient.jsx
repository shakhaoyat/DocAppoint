"use client";
// components/DoctorClient.jsx
// ✅ Client Component — handles modal, form state, interactivity
// Receives pre-fetched `doctor` prop from the Server Component

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";
import { FaBackspace } from "react-icons/fa";

const SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "04:00 PM", "05:00 PM", "06:00 PM"];

export default function DoctorClient({ doctor }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", date: "", reason: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedSlot) return alert("Please select a time slot.");
    setSubmitted(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSubmitted(false);
    setSelectedSlot(null);
    setForm({ name: "", phone: "", date: "", reason: "" });
  }

  const stats = [
    { label: "Experience", value: doctor.experience ?? "N/A", icon: "🏅" },
    { label: "Patients", value: "2,400+", icon: "👥" },
    { label: "Rating", value: "4.9 / 5", icon: "⭐" },
    { label: "Consult Fee", value: doctor.fee ? `৳${doctor.fee}` : "N/A", icon: "💳" },
  ];

  const availability = Array.isArray(doctor.availability) ? doctor.availability : [];
  const imageUrl = doctor.image || "https://i.pravatar.cc/300?img=47";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 container mx-auto">

      {/* ── HERO CARD ── */}
      <main className="max-w-[1100px] mx-auto my-10 px-6 ">
        <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(8,145,178,0.10)] flex flex-wrap gap-12 p-10">

          {/* Left – Photo */}
          <div className="flex-shrink-0">
            <div className="relative w-[220px]">
              <Link href="/all-appointments" className="flex items-center gap-3 mb-10 text-cyan-600 font-medium hover:text-cyan-700">
                <FaBackspace /> Back to Appointments
              </Link>
              <Image
                src={imageUrl}
                alt={doctor.name}
                width={220}
                height={260}
                className="w-[220px] h-[260px] object-cover rounded-2xl block bg-slate-100"
                onError={(e) => { e.target.src = "https://i.pravatar.cc/300?img=47"; }}
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                ● Available
              </span>
            </div>
          </div>

          {/* Right – Info */}
          <div className="flex-1 min-w-[280px]">
            <p className="text-xs font-semibold text-cyan-600 uppercase tracking-widest mb-1.5">{doctor.specialty}</p>
            <h1 className="text-3xl font-extrabold tracking-tight mb-4">{doctor.name}</h1>

            <div className="flex flex-wrap gap-2.5 mb-4.5">
              {doctor.hospital && <span className="bg-slate-100 text-slate-700 text-xs px-3.5 py-1.5 rounded-full font-medium">🏥 {doctor.hospital}</span>}
              {doctor.location && <span className="bg-slate-100 text-slate-700 text-xs px-3.5 py-1.5 rounded-full font-medium">📍 {doctor.location}</span>}
            </div>

            {doctor.description && <p className="text-slate-500 text-sm leading-relaxed mb-6">{doctor.description}</p>}

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {stats.map((st) => (
                <div key={st.label} className="bg-cyan-50 rounded-xl p-3.5 flex flex-col items-center gap-1">
                  <span className="text-xl">{st.icon}</span>
                  <span className="text-base font-bold text-cyan-800">{st.value}</span>
                  <span className="text-[11px] text-slate-500 font-medium">{st.label}</span>
                </div>
              ))}
            </div>

            {/* Availability */}
            {availability.length > 0 && (
              <div className="mb-7">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">Availability</h3>
                <div className="flex flex-wrap gap-2.5">
                  {availability.map((slot) => (
                    <span key={slot} className="bg-cyan-50 text-cyan-800 text-xs font-semibold px-4 py-1.5 rounded-lg">🕐 {slot}</span>
                  ))}
                </div>
              </div>
            )}

            <button
              className="bg-cyan-600 text-white border-none rounded-xl px-9 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(8,145,178,0.35)] hover:bg-cyan-700 transition"
              onClick={() => setModalOpen(true)}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </main>

      {/* ── BOOKING MODAL ── */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/55 flex items-center justify-center z-[100] p-4" onClick={closeModal}>
          <div className="bg-white rounded-[20px] w-full max-w-[520px] max-h-[90vh] overflow-y-auto p-8 shadow-[0_24px_60px_rgba(0,0,0,0.2)]" onClick={(e) => e.stopPropagation()}>
            {submitted ? (
              /* ── Success screen ── */
              <div className="text-center py-4">
                <div className="text-[56px] mb-4">✅</div>
                <h2 className="text-2xl font-extrabold mb-3">Appointment Booked!</h2>
                <p className="text-slate-700 text-sm leading-relaxed mb-2">
                  Your appointment with <strong className="font-semibold">{doctor.name}</strong> is confirmed for{" "}
                  <strong className="font-semibold">{form.date}</strong> at <strong className="font-semibold">{selectedSlot}</strong>.
                </p>
                <p className="text-slate-500 text-xs mb-7">We'll send a confirmation to your phone shortly.</p>
                <button className="bg-cyan-600 text-white border-none rounded-xl px-10 py-3 text-sm font-bold cursor-pointer hover:bg-cyan-700 transition" onClick={closeModal}>Done</button>
              </div>
            ) : (
              /* ── Booking form ── */
              <>
                <div className="flex justify-between items-flex-start mb-6">
                  <div>
                    <h2 className="text-xl font-extrabold m-0">Book Appointment</h2>
                    <p className="text-xs text-slate-500 mt-1">{doctor.name} · {doctor.specialty}</p>
                  </div>
                  <button className="bg-slate-100 border-none rounded-lg w-8 h-8 cursor-pointer text-sm text-slate-500 flex items-center justify-center hover:bg-slate-200" onClick={closeModal}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
                      Full Name
                      <input
                        className="border-[1.5px] border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-500"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </label>
                    <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
                      Phone Number
                      <input
                        className="border-[1.5px] border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-500"
                        required
                        placeholder="+880 ..."
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
                    Preferred Date
                    <input
                      className="border-[1.5px] border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-500"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </label>

                  <div className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
                    Select Time Slot
                    <div className="grid grid-cols-3 gap-2 mt-1.5">
                      {SLOTS.map((slot) => (
                        <Button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`border-[1.5px] rounded-lg py-2 px-1.5 text-xs font-medium cursor-pointer transition ${selectedSlot === slot
                            ? "bg-cyan-50 border-cyan-500 text-cyan-800 font-bold"
                            : "bg-slate-100 border-slate-200 text-slate-700"
                            }`}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                    {!selectedSlot && (
                      <span className="text-[11px] text-slate-500 mt-1 font-normal">Please pick a time slot above</span>
                    )}
                  </div>

                  <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700">
                    Reason for Visit
                    <textarea
                      className="border-[1.5px] border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-cyan-500 h-[72px] resize-y"
                      placeholder="Brief description (optional)"
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    />
                  </label>

                  <div className="flex justify-between items-center bg-slate-100 rounded-lg px-4 py-3 text-sm text-slate-700">
                    <span>Consultation Fee</span>
                    <strong className="text-lg text-cyan-800 font-bold">৳{doctor.fee ?? "—"}</strong>
                  </div>

                  <button type="submit" className="bg-cyan-600 text-white border-none rounded-xl py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(8,145,178,0.30)] hover:bg-cyan-700 transition">
                    Confirm Booking
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
