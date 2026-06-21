import { Card } from "@heroui/react";
import {
  FaUserMd,
  FaCalendarCheck,
  FaPills,
  FaHospital,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUserMd className="text-2xl" />,
    title: "Expert Doctors",
    description:
      "Our doctors are highly qualified specialists with years of experience in their respective fields.",
  },
  {
    icon: <FaCalendarCheck className="text-2xl" />,
    title: "Easy Appointment",
    description:
      "Book your appointment in just a few clicks — anytime, anywhere, without any hassle.",
  },
  {
    icon: <FaPills className="text-2xl" />,
    title: "Best Treatment",
    description:
      "We provide world-class treatment using the latest medical technology and proven methods.",
  },
  {
    icon: <FaHospital className="text-2xl" />,
    title: "Modern Facilities",
    description:
      "Our hospitals are equipped with state-of-the-art facilities to ensure your comfort and safety.",
  },
  {
    icon: <FaClock className="text-2xl" />,
    title: "24/7 Support",
    description:
      "Our support team is available around the clock to assist you with any medical queries.",
  },
  {
    icon: <FaDollarSign className="text-2xl" />,
    title: "Affordable Cost",
    description:
      "Quality healthcare shouldn't break the bank. We offer transparent and affordable pricing.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">
            Our Advantages
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose Us?
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
            We are committed to providing you with the best healthcare experience
            possible — from booking to recovery.
          </p>
          <div className="mt-4 mx-auto w-16 h-1 bg-blue-600 rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group bg-white"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 transition-all duration-300 mb-4">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 bg-blue-600 rounded-2xl p-8 text-white text-center">
          {[
            { value: "150+", label: "Expert Doctors" },
            { value: "10k+", label: "Happy Patients" },
            { value: "20+", label: "Specialties" },
            { value: "15+", label: "Years of Service" },
          ].map((stat, index) => (
            <div key={index}>
              <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
              <p className="text-sm mt-1 text-blue-100">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;