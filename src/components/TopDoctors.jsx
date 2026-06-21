import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardFooter, Button } from "@heroui/react";

// ── Fetch top doctors (highest rated / featured) ──────────────────
const fetchTopDoctors = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/all-appointments`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    // Show only top 6 doctors
    return data.slice(0, 3);
  } catch (error) {
    console.error(error);
    return [];
  }
};

// ── Single Doctor Card ────────────────────────────────────────────
const DoctorCard = ({ doctor }) => {
  return (
    <Card className="p-4 shadow-md group hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
      {/* Image */}
      <div className="relative w-full h-[200px] overflow-hidden rounded-xl">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
          ⭐ Top Doctor
        </div>
      </div>

      {/* Header */}
      <CardHeader className="flex flex-col items-start gap-1 mt-3 px-1">
        <h2 className="text-lg font-bold text-gray-900">{doctor.name}</h2>
        <p className="text-sm text-blue-600 font-medium">{doctor.specialty}</p>
      </CardHeader>

      {/* Info */}
      <div className="px-1 py-2 space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-semibold text-gray-800">Experience:</span>{" "}
          {doctor.experience}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Hospital:</span>{" "}
          {doctor.hospital}
        </p>
        <p>
          <span className="font-semibold text-gray-800">Location:</span>{" "}
          {doctor.location}
        </p>
        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-xs">
          Fee: ৳{doctor.fee}
        </div>
      </div>

      {/* Footer */}
      <CardFooter className="px-1">
        <Link href={`/all-appointments/${doctor._id}`} className="w-full">
          <Button
            color="primary"
            className="w-full font-medium rounded-full"
          >
            Book Appointment
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

// ── Top Doctors Section ───────────────────────────────────────────
const TopDoctors = async () => {
  const doctors = await fetchTopDoctors();

  return (
    <section className="bg-slate-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">
            Our Best
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Top Doctors
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
            Meet our most experienced and highly rated doctors ready to
            provide you with the best medical care.
          </p>
          {/* Decorative underline */}
          <div className="mt-4 mx-auto w-16 h-1 bg-blue-600 rounded-full" />
        </div>

        {/* Cards Grid */}
        {doctors.length === 0 ? (
          <p className="text-center text-gray-400">No doctors available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/all-appointments">
            <Button
              variant="bordered"
              color="primary"
              className="px-8 py-2 rounded-full font-semibold border-2"
            >
              View All Doctors →
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TopDoctors;