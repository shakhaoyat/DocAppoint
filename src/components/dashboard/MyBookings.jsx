"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Modal, Btn, Field } from "@/components/ui/FormKit";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─── Update Appointment Modal ──────────────────────────────────────────────
function UpdateBookingModal({ booking, isOpen, onClose, onSave }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (booking) setForm({ ...booking });
  }, [booking]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    setLoading(true);
    const updatedFields = {
      date: form.date,
      slot: form.slot || form.time,
      reason: form.reason,
      name: form.name || form.patientName,
      phone: form.phone,
    };
    try {
      const res = await fetch(`${API_URL}/appointments/${form._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) throw new Error(data.error || "Update failed");
      onSave({ ...form, ...updatedFields });
      toast.success("Appointment updated!");
      onClose();
    } catch (err) {
      toast.error(err.message || "Could not update appointment");
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update appointment"
      subtitle="Doctor info cannot be changed"
      footer={
        <>
          <Btn variant="outline" onClick={onClose} disabled={loading}>Cancel</Btn>
          <Btn onClick={handleSave} loading={loading}>Save changes</Btn>
        </>
      }
    >
      {/* Read-only doctor info */}
      <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3 mb-1">
        <img
          src={booking.doctorImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.doctorName || "Dr")}&background=dbeafe&color=1d4ed8&size=48`}
          alt={booking.doctorName}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{booking.doctorName || "—"}</p>
          <p className="text-xs text-blue-500">{booking.specialty || "—"}</p>
        </div>
        {booking.fee && (
          <span className="ml-auto shrink-0 text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
            ৳{booking.fee}
          </span>
        )}
      </div>

      <div className="h-px bg-gray-100" />

      {/* Editable fields */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date" type="date" value={form.date || ""} onChange={set("date")} />
        <Field label="Time slot" value={form.slot || form.time || ""} onChange={set("slot")} placeholder="e.g. 10:00 AM" />
      </div>
      <Field label="Patient name" value={form.name || form.patientName || ""} onChange={set("name")} placeholder="Full name" />
      <Field label="Phone number" value={form.phone || ""} onChange={set("phone")} placeholder="e.g. 017XXXXXXXX" />
      <Field label="Reason for visit" value={form.reason || ""} onChange={set("reason")} placeholder="Describe your symptoms or reason" />
    </Modal>
  );
}

// ─── Booking Card ───────────────────────────────────────────────────────────
function BookingCard({ booking, onUpdate, onDelete, deleting }) {
  const displayTime = booking.slot || booking.time || "—";
  const displayDate = booking.date || "—";
  const displayReason = booking.reason || "—";
  const doctorName = booking.doctorName || "Unknown doctor";
  const specialty = booking.specialty || "";
  const patientName = booking.name || booking.patientName || "—";
  const fee = booking.fee;
  const doctorImage = booking.doctorImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(doctorName)}&background=dbeafe&color=1d4ed8&size=80`;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">

      {/* Doctor header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <img
          src={doctorImage}
          alt={doctorName}
          className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-blue-100"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 truncate">{doctorName}</p>
          <p className="text-xs text-blue-500">{specialty}</p>
        </div>
        {fee && (
          <span className="shrink-0 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
            ৳{fee}
          </span>
        )}
      </div>

      <div className="h-px bg-gray-100 mx-5" />

      {/* Patient + appointment details */}
      <div className="px-5 py-3 space-y-2.5 text-xs">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-base">👤</span>
          <span className="font-medium">{patientName}</span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">Date</p>
            <p className="font-semibold text-gray-800">{displayDate}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">Time</p>
            <p className="font-semibold text-gray-800">{displayTime}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">Reason</p>
            <p className="font-medium text-gray-700 leading-relaxed">{displayReason}</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100 mx-5" />

      {/* Actions */}
      <div className="flex gap-2 px-5 py-3">
        <Btn variant="outline" size="sm" onClick={() => onUpdate(booking)}>✏️ Update</Btn>
        <Btn variant="danger" size="sm" onClick={() => onDelete(booking._id)} loading={deleting === booking._id}>🗑️ Delete</Btn>
      </div>
    </div>
  );
}

// ─── My Bookings ─────────────────────────────────────────────────────────────
export default function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/appointments?email=${encodeURIComponent(user.email)}`);
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to load appointments");
        const list = Array.isArray(data) ? data : data.appointments || [];
        if (!cancelled) setBookings(list);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [user?.email]);

  const handleUpdate = (b) => { setSelected(b); setEditOpen(true); };

  const handleSave = (updated) => {
    setBookings((prev) => prev.map((b) => (String(b._id) === String(updated._id) ? { ...b, ...updated } : b)));
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this appointment?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`${API_URL}/appointments/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || data.success === false) throw new Error(data.error || "Delete failed");
      setBookings((prev) => prev.filter((b) => String(b._id) !== String(id)));
      toast.success("Appointment deleted!");
    } catch (err) {
      toast.error(err.message || "Could not delete appointment");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">My Bookings</h2>
        <p className="text-sm text-gray-400 mt-0.5">
          {loading ? "Loading…" : `${bookings.length} appointment${bookings.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-28">
          <span className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <span className="text-5xl mb-4">⚠️</span>
          <p className="font-semibold text-gray-600">Could not load appointments</p>
          <p className="text-sm text-red-400 mt-1">{error}</p>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <span className="text-5xl mb-4">📭</span>
          <p className="font-semibold text-gray-600">No appointments yet</p>
          <p className="text-sm text-gray-400 mt-1">Booked appointments will appear here</p>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((b) => (
            <BookingCard key={b._id} booking={b} onUpdate={handleUpdate} onDelete={handleDelete} deleting={deleting} />
          ))}
        </div>
      )}

      <UpdateBookingModal booking={selected} isOpen={editOpen} onClose={() => setEditOpen(false)} onSave={handleSave} />
    </div>
  );
}