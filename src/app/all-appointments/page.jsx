import DoctorSearch from "@/components/DoctorSearch";

const fetchAppointments = async () => {
      try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-appointments`, {
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
            <div className="min-h-screen bg-slate-50 container mx-auto">
                  <div className="max-w-7xl mx-auto px-4 py-10">
                        <h1 className="text-3xl font-bold mb-8 text-center">
                              All Appointments
                        </h1>

                        {/* DoctorSearch handles filtering + rendering cards */}
                        <DoctorSearch appointments={appointments} />
                  </div>
            </div>
      );
};

export default AllAppointmentsPage;