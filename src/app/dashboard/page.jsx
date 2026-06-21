// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";
// import { authClient } from "@/lib/auth-client";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// const STATUS_STYLES = {
//   confirmed: "bg-emerald-100 text-emerald-700",
//   pending: "bg-amber-100 text-amber-700",
//   cancelled: "bg-red-100 text-red-700",
// };

// // ─── Avatar ───────────────────────────────────────────────────────────────────
// function Avatar({ name = "", src, size = "md" }) {
//   const [imgErr, setImgErr] = useState(false);
//   const initials = name
//     .split(" ")
//     .filter(Boolean)
//     .map((w) => w[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
//   const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-20 h-20 text-2xl" };
//   if (src && !imgErr)
//     return (
//       <img
//         src={src}
//         alt={name}
//         onError={() => setImgErr(true)}
//         className={`${sizes[size]} rounded-full object-cover shrink-0`}
//       />
//     );
//   return (
//     <div className={`${sizes[size]} rounded-full shrink-0 flex items-center justify-center font-semibold bg-blue-100 text-blue-600`}>
//       {initials || "?"}
//     </div>
//   );
// }

// // ─── Button ───────────────────────────────────────────────────────────────────
// function Btn({ children, variant = "primary", size = "md", loading, disabled, onClick, className = "" }) {
//   const base =
//     "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ";
//   const sz = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
//   const v = {
//     primary: "bg-blue-600 text-white hover:bg-blue-700",
//     outline: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
//     danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
//   };
//   return (
//     <button onClick={onClick} disabled={disabled || loading} className={`${base} ${sz} ${v[variant]} ${className}`}>
//       {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : children}
//     </button>
//   );
// }

// // ─── Field ────────────────────────────────────────────────────────────────────
// function Field({ label, readOnly, description, className = "", ...props }) {
//   return (
//     <div className={`flex flex-col gap-1 ${className}`}>
//       <label className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">{label}</label>
//       <input
//         {...props}
//         readOnly={readOnly}
//         className={`w-full px-3 py-2 text-sm rounded-lg border outline-none transition
//           ${readOnly
//             ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
//             : "bg-white text-gray-800 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"}`}
//       />
//       {description && <p className="text-[10px] text-gray-400">{description}</p>}
//     </div>
//   );
// }

// // ─── Modal ────────────────────────────────────────────────────────────────────
// function Modal({ isOpen, onClose, title, subtitle, children, footer }) {
//   useEffect(() => {
//     if (!isOpen) return;
//     const fn = (e) => e.key === "Escape" && onClose();
//     document.addEventListener("keydown", fn);
//     return () => document.removeEventListener("keydown", fn);
//   }, [isOpen, onClose]);
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[90vh] z-10">
//         <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-100">
//           <div>
//             <h3 className="text-base font-semibold text-gray-900">{title}</h3>
//             {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
//           </div>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none ml-4">
//             ×
//           </button>
//         </div>
//         <div className="overflow-y-auto px-6 py-4 flex flex-col gap-3">{children}</div>
//         {footer && <div className="px-6 pb-5 pt-3 border-t border-gray-100 flex justify-end gap-2">{footer}</div>}
//       </div>
//     </div>
//   );
// }

// // ─── Update Booking Modal ─────────────────────────────────────────────────────
// // Doctor info and the user's account email are read-only. Date, time, reason
// // and patient name can be edited.
// function UpdateBookingModal({ booking, userEmail, isOpen, onClose, onSave }) {
//   const [form, setForm] = useState({});
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (booking) setForm({ ...booking });
//   }, [booking]);

//   const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

//   const handleSave = async () => {
//     setLoading(true);
//     const updatedFields = {
//       date: form.date,
//       slot: form.slot || form.time,
//       reason: form.reason,
//       name: form.name || form.patientName,
//     };
//     try {
//       const res = await fetch(`${API_URL}/appointments/${form._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedFields),
//       });
//       const data = await res.json();
//       if (!res.ok || data.success === false) throw new Error(data.error || "Update failed");
//       onSave({ ...form, ...updatedFields });
//       onClose();
//     } catch (err) {
//       toast.error(err.message || "Could not update appointment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!booking) return null;
//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Update Appointment"
//       subtitle="Doctor info and your email are read-only"
//       footer={
//         <>
//           <Btn variant="outline" onClick={onClose} disabled={loading}>
//             Cancel
//           </Btn>
//           <Btn onClick={handleSave} loading={loading}>
//             Save changes
//           </Btn>
//         </>
//       }
//     >
//       <div className="grid grid-cols-2 gap-3">
//         <Field label="Doctor" value={form.doctorName || ""} readOnly description="Cannot be changed" />
//         <Field label="Specialty" value={form.specialty || ""} readOnly />
//       </div>
//       <Field label="Your email" value={userEmail || ""} readOnly />
//       <div className="h-px bg-gray-100 my-1" />
//       <div className="grid grid-cols-2 gap-3">
//         <Field label="Date" type="date" value={form.date || ""} onChange={set("date")} />
//         <Field label="Time" value={form.slot || form.time || ""} onChange={set("slot")} placeholder="e.g. 10:00 AM" />
//       </div>
//       <Field label="Reason for visit" value={form.reason || ""} onChange={set("reason")} />
//       <Field label="Patient name" value={form.name || form.patientName || ""} onChange={set("name")} />
//     </Modal>
//   );
// }

// // ─── Update Profile Modal ─────────────────────────────────────────────────────
// function UpdateProfileModal({ user, isOpen, onClose, onSave }) {
//   const [form, setForm] = useState({ name: "", image: "" });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (user) setForm({ name: user.name || "", image: user.image || "" });
//   }, [user]);

//   const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       // better-auth client: updates the basic user record (name / image)
//       const { error } = await authClient.updateUser({ name: form.name, image: form.image });
//       if (error) throw new Error(error.message || "Update failed");
//       onSave(form);
//       onClose();
//     } catch (err) {
//       toast.error(err.message || "Could not update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Update profile"
//       footer={
//         <>
//           <Btn variant="outline" onClick={onClose} disabled={loading}>
//             Cancel
//           </Btn>
//           <Btn onClick={handleSave} loading={loading}>
//             Save profile
//           </Btn>
//         </>
//       }
//     >
//       <div className="flex justify-center py-2">
//         <Avatar name={form.name} src={form.image} size="lg" />
//       </div>
//       <Field label="Full name" value={form.name} onChange={set("name")} placeholder="Your name" />
//       <Field label="Photo URL" value={form.image} onChange={set("image")} placeholder="https://..." description="Paste a direct image URL" />
//     </Modal>
//   );
// }

// // ─── Booking Card ─────────────────────────────────────────────────────────────
// function BookingCard({ booking, onUpdate, onDelete, deleting }) {
//   const displayTime = booking.slot || booking.time || "—";
//   const displayDate = booking.date || "—";
//   const displayReason = booking.reason || "—";
//   const displayStatus = (booking.status || "pending").toLowerCase();
//   const doctorName = booking.doctorName || "Unknown Doctor";
//   const specialty = booking.specialty || "";

//   return (
//     <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
//       <div className="flex items-center justify-between px-5 pt-4 pb-3">
//         <div className="flex items-center gap-3 min-w-0">
//           <Avatar name={doctorName} />
//           <div className="min-w-0">
//             <p className="text-sm font-semibold text-gray-900 truncate">{doctorName}</p>
//             <p className="text-xs text-gray-400">{specialty}</p>
//           </div>
//         </div>
//         <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[displayStatus] || "bg-gray-100 text-gray-600"}`}>
//           {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
//         </span>
//       </div>

//       <div className="h-px bg-gray-100 mx-5" />

//       <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 px-5 py-3 text-xs">
//         <div>
//           <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">Date</p>
//           <p className="font-medium text-gray-700">{displayDate}</p>
//         </div>
//         <div>
//           <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">Time</p>
//           <p className="font-medium text-gray-700">{displayTime}</p>
//         </div>
//         <div className="col-span-2">
//           <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">Reason</p>
//           <p className="font-medium text-gray-700">{displayReason}</p>
//         </div>
//       </div>

//       <div className="h-px bg-gray-100 mx-5" />

//       <div className="flex gap-2 px-5 py-3">
//         <Btn variant="outline" size="sm" onClick={() => onUpdate(booking)}>
//           ✏️ Update
//         </Btn>
//         <Btn variant="danger" size="sm" onClick={() => onDelete(booking._id)} loading={deleting === booking._id}>
//           🗑️ Delete
//         </Btn>
//       </div>
//     </div>
//   );
// }

// // ─── My Bookings ──────────────────────────────────────────────────────────────
// function MyBookings({ user }) {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(null);
//   const [editOpen, setEditOpen] = useState(false);
//   const [deleting, setDeleting] = useState(null);

//   useEffect(() => {
//     async function load() {
//       try {
//         setLoading(true);
//         // Scope the request to the logged-in user. Swap the query param
//         // (e.g. userId=user.id) to match whatever your backend expects.
//         const res = await fetch(`${API_URL}/appointments?email=${encodeURIComponent(user.email)}`);
//         const data = await res.json();
//         if (!res.ok) throw new Error("Failed to load appointments");
//         const all = Array.isArray(data) ? data : data.appointments || [];
//         // Defensive client-side filter in case the backend ignores the query
//         // param and returns every appointment.
//         const mine = all.filter((b) => !b.patientEmail || b.patientEmail === user.email || b.email === user.email);
//         setBookings(mine);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (user?.email) load();
//   }, [user?.email]);

//   const handleUpdate = (b) => {
//     setSelected(b);
//     setEditOpen(true);
//   };

//   const handleSave = (updated) => {
//     setBookings((prev) => prev.map((b) => (String(b._id) === String(updated._id) ? { ...b, ...updated } : b)));
//     toast.success("Appointment updated successfully!");
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Delete this appointment?")) return;
//     setDeleting(id);
//     try {
//       const res = await fetch(`${API_URL}/appointments/${id}`, { method: "DELETE" });
//       const data = await res.json();
//       if (!res.ok || data.success === false) throw new Error(data.error || "Delete failed");
//       setBookings((prev) => prev.filter((b) => String(b._id) !== String(id)));
//       toast.success("Appointment deleted successfully!");
//     } catch (err) {
//       toast.error(err.message || "Could not delete appointment");
//     } finally {
//       setDeleting(null);
//     }
//   };

//   return (
//     <div className="space-y-5">
//       <div>
//         <h2 className="text-xl font-bold text-gray-900">My Bookings</h2>
//         <p className="text-sm text-gray-400 mt-0.5">
//           {loading ? "Loading…" : `${bookings.length} appointment${bookings.length !== 1 ? "s" : ""}`}
//         </p>
//       </div>

//       {loading && (
//         <div className="flex items-center justify-center py-28">
//           <span className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
//         </div>
//       )}

//       {!loading && error && (
//         <div className="flex flex-col items-center justify-center py-28 text-center">
//           <span className="text-5xl mb-4">⚠️</span>
//           <p className="font-semibold text-gray-600">Could not load appointments</p>
//           <p className="text-sm text-red-400 mt-1">{error}</p>
//         </div>
//       )}

//       {!loading && !error && bookings.length === 0 && (
//         <div className="flex flex-col items-center justify-center py-28 text-center">
//           <span className="text-5xl mb-4">📭</span>
//           <p className="font-semibold text-gray-600">No appointments yet</p>
//           <p className="text-sm text-gray-400 mt-1">Booked appointments will appear here</p>
//         </div>
//       )}

//       {!loading && !error && bookings.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {bookings.map((b) => (
//             <BookingCard key={b._id} booking={b} onUpdate={handleUpdate} onDelete={handleDelete} deleting={deleting} />
//           ))}
//         </div>
//       )}

//       <UpdateBookingModal
//         booking={selected}
//         userEmail={user.email}
//         isOpen={editOpen}
//         onClose={() => setEditOpen(false)}
//         onSave={handleSave}
//       />
//     </div>
//   );
// }

// // ─── My Profile ───────────────────────────────────────────────────────────────
// function ProfileRow({ icon, label, value }) {
//   return (
//     <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
//       <span className="text-base">{icon}</span>
//       <div className="min-w-0">
//         <p className="text-[10px] uppercase tracking-wide text-gray-400">{label}</p>
//         <p className="text-sm font-medium text-gray-800 truncate">{value}</p>
//       </div>
//     </div>
//   );
// }

// function MyProfile({ user, onProfileUpdate }) {
//   const [editOpen, setEditOpen] = useState(false);

//   const handleSave = (updated) => {
//     onProfileUpdate(updated);
//     toast.success("Profile updated successfully!");
//   };

//   return (
//     <div className="max-w-md space-y-5">
//       <div>
//         <h2 className="text-xl font-bold text-gray-900">My Profile</h2>
//         <p className="text-sm text-gray-400 mt-0.5">Manage your personal information</p>
//       </div>

//       <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
//         <div className="h-20 bg-gradient-to-r from-blue-500 to-emerald-500" />
//         <div className="px-6 pb-6">
//           <div className="-mt-10 mb-3">
//             <div className="w-20 h-20 rounded-full ring-4 ring-white overflow-hidden bg-blue-100 flex items-center justify-center">
//               <Avatar name={user.name} src={user.image} size="lg" />
//             </div>
//           </div>
//           <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
//           <p className="text-sm text-gray-400">{user.email}</p>
//           <div className="border-t border-gray-100 mt-4 pt-4 space-y-2.5">
//             <ProfileRow icon="👤" label="Full name" value={user.name} />
//             <ProfileRow icon="✉️" label="Email address" value={user.email} />
//             <ProfileRow icon="🖼️" label="Profile photo" value={user.image ? "Set" : "Not set"} />
//           </div>
//           <Btn className="w-full mt-5" onClick={() => setEditOpen(true)}>
//             ✏️ Update profile
//           </Btn>
//         </div>
//       </div>

//       <UpdateProfileModal user={user} isOpen={editOpen} onClose={() => setEditOpen(false)} onSave={handleSave} />
//     </div>
//   );
// }

// // ─── Sidebar ──────────────────────────────────────────────────────────────────
// function Sidebar({ active, onSelect, user }) {
//   const router = useRouter();
//   const links = [
//     { key: "bookings", label: "My Bookings", icon: "📋" },
//     { key: "profile", label: "My Profile", icon: "👤" },
//   ];

//   const handleLogout = async () => {
//     await authClient.signOut();
//     router.push("/login");
//   };

//   return (
//     <aside className="flex flex-col w-56 shrink-0 bg-white border-r border-gray-100 min-h-screen p-4 gap-5">
//       <div className="flex items-center gap-2 px-2 pt-2">
//         <span className="text-xl">🏨</span>
//         <span className="font-bold text-gray-900 tracking-tight">
//           <span className="text-blue-500">Doc</span>Appoint
//         </span>
//       </div>

//       <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl p-3">
//         <Avatar name={user.name} src={user.image} size="sm" />
//         <div className="min-w-0">
//           <p className="text-xs font-semibold text-gray-800 truncate">{user.name}</p>
//           <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
//         </div>
//       </div>

//       <nav className="flex flex-col gap-1">
//         {links.map((l) => (
//           <button
//             key={l.key}
//             onClick={() => onSelect(l.key)}
//             className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm w-full text-left transition-colors
//               ${active === l.key ? "bg-blue-600 text-white font-semibold shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
//           >
//             <span>{l.icon}</span>
//             {l.label}
//           </button>
//         ))}
//       </nav>

//       <div className="mt-auto">
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
//         >
//           🚪 Sign out
//         </button>
//       </div>
//     </aside>
//   );
// }

// // ─── Root (private route) ──────────────────────────────────────────────────────
// export default function Dashboard() {
//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();
//   const sessionUser = session?.user;

//   const [tab, setTab] = useState("bookings");
//   const [user, setUser] = useState(null);

//   // Keep a local, instantly-editable copy of the user so profile edits
//   // reflect in the UI without waiting on a session refetch.
//   useEffect(() => {
//     if (sessionUser) setUser(sessionUser);
//   }, [sessionUser]);

//   // Private route: redirect unauthenticated visitors to /login.
//   useEffect(() => {
//     if (!isPending && !sessionUser) {
//       router.push("/login");
//     }
//   }, [isPending, sessionUser, router]);

//   if (isPending) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <span className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!sessionUser || !user) {
//     // Redirect is in-flight; render nothing to avoid a flash of content.
//     return null;
//   }

//   return (
//     <>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 3500,
//           style: { borderRadius: "10px", fontSize: "14px" },
//           success: { iconTheme: { primary: "#2563eb", secondary: "#fff" } },
//         }}
//       />
//       <div className="flex min-h-screen bg-gray-50">
//         <Sidebar active={tab} onSelect={setTab} user={user} />
//         <main className="flex-1 p-8 overflow-auto">
//           {tab === "bookings" && <MyBookings user={user} />}
//           {tab === "profile" && <MyProfile user={user} onProfileUpdate={(updated) => setUser((u) => ({ ...u, ...updated }))} />}
//         </main>
//       </div>
//     </>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Spinner } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Sidebar from "@/components/dashboard/Sidebar";
import MyBookings from "@/components/dashboard/MyBookings";
import MyProfile from "@/components/dashboard/MyProfile";

export default function DashboardPage() {
      const router = useRouter();
      const { data: session, isPending } = authClient.useSession();
      const user = session?.user;
      const [tab, setTab] = useState("bookings");

      // Private route: bounce guests to /login once the session check settles
      useEffect(() => {
            if (!isPending && !user) {
                  router.push("/login");
            }
      }, [isPending, user, router]);

      if (isPending) {
            return (
                  <div className="flex min-h-screen items-center justify-center bg-gray-50 container mx-auto">
                        <Spinner size="lg" />
                  </div>
            );
      }

      if (!user) return null; // redirect is already in flight

      return (
            <>
                  {/* If you already render <Toaster /> in app/layout.jsx, remove this one
         to avoid duplicate toasts. */}
                  <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
                  <div className="flex min-h-screen bg-gray-50 container mx-auto">
                        <Sidebar active={tab} onSelect={setTab} user={user} />
                        <main className="flex-1 p-6 md:p-8 overflow-auto">
                              {tab === "bookings" && <MyBookings user={user} />}
                              {tab === "profile" && <MyProfile />}
                        </main>
                  </div>
            </>
      );
}
