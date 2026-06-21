// app/doctors/[id]/not-found.jsx
// ✅ Shown automatically when page.jsx calls notFound()

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased selection:bg-cyan-500 selection:text-white">
      <div className="bg-white rounded-3xl p-10 text-center max-w-[420px] shadow-[0_10px_50px_rgba(8,145,178,0.06)] border border-slate-100 flex flex-col items-center">
        <Image
          width={40}
          height={40}
          src="/logo.png"
          alt="logo"
        />

        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-4 mb-2.5">
          Doctor Not Found
        </h1>

        <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 font-normal">
          We can not find a doctor with that ID. They may have been removed or the link is incorrect.
        </p>

        <Link
          href="/all-appointments"
          className="inline-block bg-cyan-600 text-white font-bold text-sm rounded-xl px-6 py-3 shadow-[0_4px_14px_rgba(8,145,178,0.25)] hover:bg-cyan-700 transition-colors active:scale-[0.98]"
        >
          ← Back to Appointments
        </Link>
      </div>
    </div>
  );
}