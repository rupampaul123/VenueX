import { Search, Calendar, ShieldCheck, Globe, CreditCard, Users } from "lucide-react";

export default function KeyFeatures() {
  const features = [
    {
      icon: <Search className="w-6 h-6 text-[#2563EB]" />,
      title: "Easy Search & Filter",
      desc: "Search venues by location, type, and budget to find the perfect event match.",
    },
    {
      icon: <Calendar className="w-6 h-6 text-[#2563EB]" />,
      title: "Instant Booking & Availability",
      desc: "Check availability, book instantly, and manage seamlessly with no hassle.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#2563EB]" />,
      title: "Verified Venues & Reviews",
      desc: "Trustworthy venues with genuine reviews to make booking decisions easier.",
    },
    {
      icon: <Globe className="w-6 h-6 text-[#2563EB]" />,
      title: "Wide Range of Options",
      desc: "From small gatherings to grand celebrations, find venues for every occasion.",
    },
    {
      icon: <Users className="w-6 h-6 text-[#2563EB]" />,
      title: "Transparent Pricing",
      desc: "Clear and fair pricing with no hidden charges so you can plan better.",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#2563EB]" />,
      title: "Flexible Payment Options",
      desc: "24/7 customer support with seamless and secure payment processing.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 to-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-[#2563EB] mb-12">Key Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-start text-left transition hover:shadow-lg"
            >
              <div className="p-3 bg-blue-100 rounded-xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
