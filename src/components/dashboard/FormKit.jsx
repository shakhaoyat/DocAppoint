"use client";

import { useEffect } from "react";

// ─── Button ───────────────────────────────────────────────────────────────────
export function Btn({ children, variant = "primary", size = "md", loading, disabled, onClick, className = "" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ";
  const sz = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${sz} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────
export function Field({ label, readOnly, description, className = "", ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">{label}</label>
      <input
        {...props}
        readOnly={readOnly}
        className={`w-full px-3 py-2 text-sm rounded-lg border outline-none transition
          ${readOnly
            ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-800 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"}`}
      />
      {description && <p className="text-[10px] text-gray-400">{description}</p>}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export function Modal({ isOpen, onClose, title, subtitle, children, footer }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none ml-4">
            ×
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-4 flex flex-col gap-3">{children}</div>
        {footer && <div className="px-6 pb-5 pt-3 border-t border-gray-100 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
