import Link from "next/link";
import { Button } from "@heroui/react";
import { FaSearch, FaClipboardList, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const steps = [
      {
            step: "01",
            icon: <FaSearch className="text-3xl" />,
            title: "Search Doctor",
            description:
                  "Browse through our list of experienced doctors and filter by specialty, location, or availability.",
            color: "bg-blue-50 border-blue-200",
            iconBg: "bg-blue-100 text-blue-600",
            stepColor: "text-blue-600",
      },
      {
            step: "02",
            icon: <FaClipboardList className="text-3xl" />,
            title: "Check Profile",
            description:
                  "View detailed doctor profiles including experience, hospital affiliation, fees, and patient reviews.",
            color: "bg-purple-50 border-purple-200",
            iconBg: "bg-purple-100 text-purple-600",
            stepColor: "text-purple-600",
      },
      {
            step: "03",
            icon: <FaCalendarAlt className="text-3xl" />,
            title: "Book Appointment",
            description:
                  "Select your preferred date and time slot and confirm your appointment with just one click.",
            color: "bg-green-50 border-green-200",
            iconBg: "bg-green-100 text-green-600",
            stepColor: "text-green-600",
      },
      {
            step: "04",
            icon: <FaCheckCircle className="text-3xl" />,
            title: "Get Consultation",
            description:
                  "Visit the doctor at the scheduled time and receive expert medical consultation and treatment.",
            color: "bg-orange-50 border-orange-200",
            iconBg: "bg-orange-100 text-orange-600",
            stepColor: "text-orange-600",
      },
];

const HowItWorks = () => {
      return (
            <section className="bg-slate-50 py-16 px-4">
                  <div className="max-w-7xl mx-auto">

                        {/* Section Header */}
                        <div className="text-center mb-12">
                              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">
                                    Simple Process
                              </p>
                              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    How It Works
                              </h2>
                              <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
                                    Getting the medical help you need is now easier than ever. Follow
                                    these simple steps to book your appointment.
                              </p>
                              <div className="mt-4 mx-auto w-16 h-1 bg-blue-600 rounded-full" />
                        </div>

                        {/* Steps Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">

                              {/* Connector line (desktop only) */}
                              <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-blue-100 z-0" />

                              {steps.map((step, index) => (
                                    <div
                                          key={index}
                                          className={`relative z-10 rounded-2xl border p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 ${step.color}`}
                                    >
                                          {/* Step Number */}
                                          <span className={`text-xs font-bold uppercase tracking-widest ${step.stepColor} mb-3 block`}>
                                                Step {step.step}
                                          </span>

                                          {/* Icon */}
                                          <div className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full ${step.iconBg} mb-4`}>
                                                {step.icon}
                                          </div>

                                          {/* Title */}
                                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                                                {step.title}
                                          </h3>

                                          {/* Description */}
                                          <p className="text-sm text-gray-500 leading-relaxed">
                                                {step.description}
                                          </p>
                                    </div>
                              ))}
                        </div>

                        {/* CTA Banner */}
                        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 p-10 text-center text-white">
                              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                                    Ready to Book Your Appointment?
                              </h3>
                              <p className="text-blue-100 text-sm mb-6 max-w-lg mx-auto">
                                    Join thousands of patients who trust us for their healthcare needs.
                                    Your health is our priority.
                              </p>
                              <Link href="/all-appointments">
                                    <Button className="bg-white text-blue-600 font-bold px-8 py-2 rounded-full hover:bg-blue-50 transition-colors">
                                          Book Now →
                                    </Button>
                              </Link>
                        </div>

                  </div>
            </section>
      );
};

export default HowItWorks;