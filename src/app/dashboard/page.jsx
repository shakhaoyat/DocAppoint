"use client";

import { useState, useEffect } from "react";

// ─── Mock data ────────────────────────────────────────────────────────────────
const CURRENT_USER = {
      id: "u1",
      name: "Ayesha Rahman",
      email: "ayesha@example.com",
      photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha&backgroundColor=b6e3f4",
};

const INITIAL_BOOKINGS = [
      {
            _id: "b1",
            doctorName: "Dr. Farhan Hossain",
            specialty: "Cardiologist",
            doctorEmail: "farhan@clinic.com",
            date: "2025-07-10",
            time: "10:00 AM",
            reason: "Chest pain follow-up",
            status: "Confirmed",
            patientName: "Ayesha Rahman",
            patientEmail: "ayesha@example.com",
      },
      {
            _id: "b2",
            doctorName: "Dr. Nadia Islam",
            specialty: "Dermatologist",
            doctorEmail: "nadia@clinic.com",
            date: "2025-07-15",
            time: "2:30 PM",
            reason: "Skin rash consultation",
            status: "Pending",
            patientName: "Ayesha Rahman",
            patientEmail: "ayesha@example.com",
      },
      {
            _id: "b3",
            doctorName: "Dr. Karim Uddin",
            specialty: "Orthopedist",
            doctorEmail: "karim@clinic.com",
            date: "2025-07-20",
            time: "9:00 AM",
            reason: "Knee pain evaluation",
            status: "Confirmed",
            patientName: "Ayesha Rahman",
            patientEmail: "ayesha@example.com",
      },
];

const STATUS_STYLES = {
      Confirmed: "bg-emerald-100 text-emerald-700",
      Pending: "bg-amber-100 text-amber-700",
      Cancelled: "bg-red-100 text-red-700",
};

// ─── Toast system ─────────────────────────────────────────────────────────────
function ToastItem({ message, sub, color, onDone }) {
      useEffect(() => {
            const t = setTimeout(onDone, 3500);
            return () => clearTimeout(t);
      }, []);
      const accent = color === "danger" ? "border-red-400" : "border-emerald-400";
      const icon = color === "danger" ? "🗑️" : "✅";
      return (
            <div className={`flex items-start gap-3 bg-white border-l-4 ${accent} shadow-lg rounded-lg px-4 py-3 min-w-72 max-w-sm`}>
                  <span className="text-xl mt-0.5">{icon}</span>
                  <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{message}</p>
                        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
                  </div>
                  <button onClick={onDone} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
      );
}

function useToast() {
      const [toasts, setToasts] = useState([]);
      const show = (message, sub, color = "success") => {
            setToasts((p) => [...p, { id: Date.now(), message, sub, color }]);
      };
      const remove = (id) => setToasts((p) => p.filter((t) => t.id !== id));
      const ToastContainer = () => (
            <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
                  {toasts.map((t) => (
                        <div key={t.id} className="pointer-events-auto">
                              <ToastItem {...t} onDone={() => remove(t.id)} />
                        </div>
                  ))}
            </div>
      );
      return { show, ToastContainer };
}

// ─── Avatar / Initials ────────────────────────────────────────────────────────
function Avatar({ name = "", src, size = "md" }) {
      const [imgErr, setImgErr] = useState(false);
      const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
      const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-20 h-20 text-2xl" };
      const cls = `${sizes[size]} rounded-full shrink-0 flex items-center justify-center font-semibold`;
      if (src && !imgErr)
            return <img src={src} alt={name} onError={() => setImgErr(true)} className={`${sizes[size]} rounded-full object-cover shrink-0`} />;
      return (
            <div className={`${cls} bg-indigo-100 text-indigo-700`}>{initials}</div>
      );
}

// ─── Reusable Field ───────────────────────────────────────────────────────────
function Field({ label, readOnly, description, className = "", ...props }) {
      return (
            <div className={`flex flex-col gap-1 ${className}`}>
                  <label className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">{label}</label>
                  <input
                        {...props}
                        readOnly={readOnly}
                        className={`w-full px-3 py-2 text-sm rounded-lg border outline-none transition
          ${readOnly
                                    ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                                    : "bg-white text-gray-800 border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                              }`}
                  />
                  {description && <p className="text-[10px] text-gray-400">{description}</p>}
            </div>
      );
}

// ─── Button ───────────────────────────────────────────────────────────────────
function Btn({ children, variant = "primary", size = "md", loading, disabled, onClick, className = "" }) {
      const base = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ";
      const sz = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
      const v = {
            primary: "bg-indigo-600 text-white hover:bg-indigo-700",
            outline: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
            danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
            ghost: "text-gray-600 hover:bg-gray-100",
      };
      return (
            <button onClick={onClick} disabled={disabled || loading} className={`${base} ${sz} ${v[variant]} ${className}`}>
                  {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : children}
            </button>
      );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, title, subtitle, children, footer }) {
      useEffect(() => {
            if (!isOpen) return;
            const fn = (e) => e.key === "Escape" && onClose();
            document.addEventListener("keydown", fn);
            return () => document.removeEventListener("keydown", fn);
      }, [isOpen, onClose]);

      if (!isOpen) return null;
      return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
                  <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[90vh] z-10">
                        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                              <div>
                                    <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                                    {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
                              </div>
                              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none ml-4 mt-0.5">×</button>
                        </div>
                        <div className="overflow-y-auto px-6 py-4 flex flex-col gap-3">{children}</div>
                        {footer && (
                              <div className="px-6 pb-5 pt-3 border-t border-gray-100 flex justify-end gap-2">{footer}</div>
                        )}
                  </div>
            </div>
      );
}

// ─── Update Booking Modal ─────────────────────────────────────────────────────
function UpdateBookingModal({ booking, isOpen, onClose, onSave }) {
      const [form, setForm] = useState({});
      const [loading, setLoading] = useState(false);

      useEffect(() => { if (booking) setForm({ ...booking }); }, [booking]);

      const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

      const handleSave = async () => {
            setLoading(true);
            await new Promise((r) => setTimeout(r, 700));
            onSave(form);
            setLoading(false);
            onClose();
      };

      if (!booking) return null;

      return (
            <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                  title="Update Appointment"
                  subtitle="Doctor info and your email are read-only"
                  footer={
                        <>
                              <Btn variant="outline" onClick={onClose} disabled={loading}>Cancel</Btn>
                              <Btn onClick={handleSave} loading={loading}>Save changes</Btn>
                        </>
                  }
            >
                  <div className="grid grid-cols-2 gap-3">
                        <Field label="Doctor" value={form.doctorName || ""} readOnly description="Cannot be changed" />
                        <Field label="Specialty" value={form.specialty || ""} readOnly />
                  </div>
                  <Field label="Doctor email" value={form.doctorEmail || ""} readOnly />
                  <div className="h-px bg-gray-100 my-1" />
                  <div className="grid grid-cols-2 gap-3">
                        <Field label="Date" type="date" value={form.date || ""} onChange={set("date")} />
                        <Field label="Time" value={form.time || ""} onChange={set("time")} placeholder="e.g. 10:00 AM" />
                  </div>
                  <Field label="Reason for visit" value={form.reason || ""} onChange={set("reason")} />
                  <Field label="Patient name" value={form.patientName || ""} onChange={set("patientName")} />
                  <Field label="Your email" value={form.patientEmail || ""} readOnly description="Email cannot be changed" />
            </Modal>
      );
}

// ─── Update Profile Modal ─────────────────────────────────────────────────────
function UpdateProfileModal({ user, isOpen, onClose, onSave }) {
      const [form, setForm] = useState({ name: "", photoURL: "" });
      const [loading, setLoading] = useState(false);

      useEffect(() => { if (user) setForm({ name: user.name, photoURL: user.photoURL }); }, [user]);

      const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

      const handleSave = async () => {
            setLoading(true);
            await new Promise((r) => setTimeout(r, 600));
            onSave(form);
            setLoading(false);
            onClose();
      };

      return (
            <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                  title="Update profile"
                  footer={
                        <>
                              <Btn variant="outline" onClick={onClose} disabled={loading}>Cancel</Btn>
                              <Btn onClick={handleSave} loading={loading}>Save profile</Btn>
                        </>
                  }
            >
                  <div className="flex justify-center py-2">
                        <Avatar name={form.name} src={form.photoURL} size="lg" />
                  </div>
                  <Field label="Full name" value={form.name} onChange={set("name")} placeholder="Your name" />
                  <Field
                        label="Photo URL"
                        value={form.photoURL}
                        onChange={set("photoURL")}
                        placeholder="https://..."
                        description="Paste a direct image URL"
                  />
            </Modal>
      );
}

// ─── Booking Card ─────────────────────────────────────────────────────────────
function BookingCard({ booking, onUpdate, onDelete }) {
      return (
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col container mx-auto">
                  <div className="flex items-center justify-between px-5 pt-4 pb-3 container mx-auto">
                        <div className="flex items-center gap-3 min-w-0">
                              <Avatar name={booking.doctorName} />
                              <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">{booking.doctorName}</p>
                                    <p className="text-xs text-gray-400">{booking.specialty}</p>
                              </div>
                        </div>
                        <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[booking.status] || "bg-gray-100 text-gray-600"}`}>
                              {booking.status}
                        </span>
                  </div>

                  <div className="h-px bg-gray-100 mx-5" />

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 px-5 py-3 text-xs">
                        <div>
                              <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">Date</p>
                              <p className="font-medium text-gray-700">{booking.date}</p>
                        </div>
                        <div>
                              <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">Time</p>
                              <p className="font-medium text-gray-700">{booking.time}</p>
                        </div>
                        <div className="col-span-2">
                              <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-0.5">Reason</p>
                              <p className="font-medium text-gray-700">{booking.reason}</p>
                        </div>
                  </div>

                  <div className="h-px bg-gray-100 mx-5" />

                  <div className="flex gap-2 px-5 py-3">
                        <Btn variant="outline" size="sm" onClick={() => onUpdate(booking)}>✏️ Update</Btn>
                        <Btn variant="danger" size="sm" onClick={() => onDelete(booking._id)}>🗑️ Delete</Btn>
                  </div>
            </div>
      );
}

// ─── My Bookings page ─────────────────────────────────────────────────────────
function MyBookings({ toast }) {
      const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
      const [selected, setSelected] = useState(null);
      const [editOpen, setEditOpen] = useState(false);

      const handleUpdate = (b) => { setSelected(b); setEditOpen(true); };

      const handleSave = (updated) => {
            setBookings((prev) => prev.map((b) => (b._id === updated._id ? { ...b, ...updated } : b)));
            toast("Appointment updated successfully!", "Your booking details have been saved.");
      };

      const handleDelete = async (id) => {
            await new Promise((r) => setTimeout(r, 200));
            setBookings((prev) => prev.filter((b) => b._id !== id));
            toast("Appointment deleted", "Your booking has been removed.", "danger");
      };

      return (
            <div className="space-y-5">
                  <div>
                        <h2 className="text-xl font-bold text-gray-900">My Bookings</h2>
                        <p className="text-sm text-gray-400 mt-0.5">
                              {bookings.length} appointment{bookings.length !== 1 ? "s" : ""}
                        </p>
                  </div>

                  {bookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-28 text-center">
                              <span className="text-5xl mb-4">📭</span>
                              <p className="font-semibold text-gray-600">No appointments yet</p>
                              <p className="text-sm text-gray-400 mt-1">Your booked appointments will appear here</p>
                        </div>
                  ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {bookings.map((b) => (
                                    <BookingCard key={b._id} booking={b} onUpdate={handleUpdate} onDelete={handleDelete} />
                              ))}
                        </div>
                  )}

                  <UpdateBookingModal
                        booking={selected}
                        isOpen={editOpen}
                        onClose={() => setEditOpen(false)}
                        onSave={handleSave}
                  />
            </div>
      );
}

// ─── My Profile page ──────────────────────────────────────────────────────────
function ProfileRow({ icon, label, value }) {
      return (
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
                  <span className="text-base">{icon}</span>
                  <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wide text-gray-400">{label}</p>
                        <p className="text-sm font-medium text-gray-800 truncate">{value}</p>
                  </div>
            </div>
      );
}

function MyProfile({ toast }) {
      const [user, setUser] = useState(CURRENT_USER);
      const [editOpen, setEditOpen] = useState(false);

      const handleSave = (updated) => {
            setUser((u) => ({ ...u, ...updated }));
            toast("Profile updated successfully!", "Your profile information has been saved.");
      };

      return (
            <div className="max-w-md space-y-5">
                  <div>
                        <h2 className="text-xl font-bold text-gray-900">My Profile</h2>
                        <p className="text-sm text-gray-400 mt-0.5">Manage your personal information</p>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                        {/* Cover */}
                        <div className="h-20 bg-gradient-to-r from-indigo-500 to-violet-500" />

                        <div className="px-6 pb-6">
                              {/* Avatar overlapping cover */}
                              <div className="-mt-10 mb-3">
                                    <div className="w-20 h-20 rounded-full ring-4 ring-white overflow-hidden bg-indigo-100 flex items-center justify-center">
                                          <Avatar name={user.name} src={user.photoURL} size="lg" />
                                    </div>
                              </div>

                              <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                              <p className="text-sm text-gray-400">{user.email}</p>

                              <div className="border-t border-gray-100 mt-4 pt-4 space-y-2.5">
                                    <ProfileRow icon="👤" label="Full name" value={user.name} />
                                    <ProfileRow icon="✉️" label="Email address" value={user.email} />
                                    <ProfileRow icon="🏥" label="Account type" value="Patient" />
                              </div>

                              <Btn className="w-full mt-5" onClick={() => setEditOpen(true)}>
                                    ✏️ Update profile
                              </Btn>
                        </div>
                  </div>

                  <UpdateProfileModal
                        user={user}
                        isOpen={editOpen}
                        onClose={() => setEditOpen(false)}
                        onSave={handleSave}
                  />
            </div>
      );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active, onSelect, user }) {
      const links = [
            { key: "bookings", label: "My Bookings", icon: "📋" },
            { key: "profile", label: "My Profile", icon: "👤" },
      ];

      return (
            <aside className="flex flex-col w-56 shrink-0 bg-white border-r border-gray-100 min-h-screen p-4 gap-5">
                  <div className="flex items-center gap-2 px-2 pt-2">
                        <span className="text-xl">🏨</span>
                        <span className="font-bold text-gray-900 tracking-tight">MediBook</span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl p-3">
                        <Avatar name={user.name} src={user.photoURL} size="sm" />
                        <div className="min-w-0">
                              <p className="text-xs font-semibold text-gray-800 truncate">{user.name}</p>
                              <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                        </div>
                  </div>

                  <nav className="flex flex-col gap-1">
                        {links.map((l) => (
                              <button
                                    key={l.key}
                                    onClick={() => onSelect(l.key)}
                                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm w-full text-left transition-colors
              ${active === l.key
                                                ? "bg-indigo-600 text-white font-semibold shadow-sm"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                          }`}
                              >
                                    <span>{l.icon}</span>
                                    {l.label}
                              </button>
                        ))}
                  </nav>

                  <div className="mt-auto">
                        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors">
                              🚪 Sign out
                        </button>
                  </div>
            </aside>
      );
}

// ─── Private Route Guard ──────────────────────────────────────────────────────
function PrivateRoute({ isLoggedIn, children }) {
      if (!isLoggedIn) {
            return (
                  <div className="min-h-screen flex items-center justify-center bg-gray-50">
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-10 text-center max-w-sm w-full">
                              <span className="text-5xl block mb-4">🔒</span>
                              <h2 className="text-lg font-bold text-gray-900">Access restricted</h2>
                              <p className="text-sm text-gray-400 mt-1 mb-6">
                                    Please sign in to view your dashboard
                              </p>
                              <Btn className="w-full">Go to login</Btn>
                        </div>
                  </div>
            );
      }
      return children;
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Dashboard() {
      const [isLoggedIn] = useState(true); // set false to test private route
      const [tab, setTab] = useState("bookings");
      const { show: toast, ToastContainer } = useToast();

      return (
            <>
                  <ToastContainer />
                  <PrivateRoute isLoggedIn={isLoggedIn}>
                        <div className="flex min-h-screen bg-gray-50 container mx-auto">
                              <Sidebar active={tab} onSelect={setTab} user={CURRENT_USER} />
                              <main className="flex-1 p-8 overflow-auto">
                                    {tab === "bookings" && <MyBookings toast={toast} />}
                                    {tab === "profile" && <MyProfile toast={toast} />}
                              </main>
                        </div>
                  </PrivateRoute>
            </>
      );
}