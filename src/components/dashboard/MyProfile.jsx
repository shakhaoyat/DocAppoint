"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Modal, Btn, Field, Avatar } from "@/components/ui/FormKit";

// ─── Update Profile Modal ────────────────────────────────────────────────────
function UpdateProfileModal({ user, isOpen, onClose, onSaved }) {
  const [form, setForm] = useState({ name: user?.name || "", image: user?.image || "" });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name can't be empty");
      return;
    }
    setLoading(true);
    try {
      // authClient.updateUser updates fields on the current Better Auth session user.
      // If your setup uses a separate /users API instead, swap this for a fetch() call.
      const { error } = await authClient.updateUser({
        name: form.name.trim(),
        image: form.image.trim() || undefined,
      });
      if (error) throw new Error(error.message || "Update failed");
      toast.success("Profile updated successfully!");
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.message || "Could not update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update profile"
      footer={
        <>
          <Btn variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Btn>
          <Btn onClick={handleSave} loading={loading}>
            Save profile
          </Btn>
        </>
      }
    >
      <div className="flex justify-center py-2">
        <Avatar src={form.image} name={form.name} size="lg" />
      </div>
      <Field label="Full name" value={form.name} onChange={set("name")} placeholder="Your name" />
      <Field
        label="Photo URL"
        value={form.image}
        onChange={set("image")}
        placeholder="https://..."
        description="Paste a direct image URL"
      />
    </Modal>
  );
}

// ─── Profile Row ──────────────────────────────────────────────────────────────
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

// ─── My Profile ───────────────────────────────────────────────────────────────
export default function MyProfile() {
  const { data: session, refetch } = authClient.useSession();
  const user = session?.user;
  const [editOpen, setEditOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="max-w-md space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">My Profile</h2>
        <p className="text-sm text-gray-400 mt-0.5">Manage your personal information</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="h-20 bg-gradient-to-r from-blue-500 to-cyan-500" />
        <div className="px-6 pb-6">
          <div className="-mt-10 mb-3">
            <Avatar src={user.image} name={user.name} size="lg" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-400">{user.email}</p>
          <div className="border-t border-gray-100 mt-4 pt-4 space-y-2.5">
            <ProfileRow icon="👤" label="Full name" value={user.name} />
            <ProfileRow icon="✉️" label="Email address" value={user.email} />
            <ProfileRow icon="🖼️" label="Profile photo" value={user.image ? "Custom photo" : "Default avatar"} />
          </div>
          <Btn className="w-full mt-5" onClick={() => setEditOpen(true)}>
            ✏️ Update profile
          </Btn>
        </div>
      </div>

      <UpdateProfileModal user={user} isOpen={editOpen} onClose={() => setEditOpen(false)} onSaved={refetch} />
    </div>
  );
}