// src/app/all-appointments/[id]/page.jsx

import { notFound } from "next/navigation";
import DoctorClient from "@/components/DoctorClient";

// ✅ await params before accessing .id (required in Next.js 15+)
export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    const res = await fetch(
      `http://localhost:5000/all-appointments/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return { title: "Doctor Not Found" };
    const doctor = await res.json();
    return {
      title: `${doctor.name} — ${doctor.specialty}`,
      description: doctor.description,
    };
  } catch {
    return { title: "Doctor Details" };
  }
}

async function getDoctor(id) {
  const res = await fetch(
    `http://localhost:5000/all-appointments/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function DoctorDetailsPage({ params }) {
  const { id } = await params;        // ✅ await params here too
  const doctor = await getDoctor(id);
  if (!doctor) notFound();
  return <DoctorClient doctor={doctor} />;
}