import AppointmentCard from "@/components/AppointmentCard";

const fetchAppointments = async () => {
  try {
    const res = await fetch("http://localhost:5000/all-appointments", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch appointments");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const AllAppointmentsPage = async () => {
  const appointments = await fetchAppointments();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">
          All Appointments
        </h1>

        {appointments.length === 0 ? (
          <div className="text-center text-gray-500">
            No appointments found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointmentsPage;