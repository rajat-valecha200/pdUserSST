import { Star } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  doctorName: string;
  speciality: string;
  date: string;
  time: string;
  type: string;
  price: number;
  image: string;
  location: string;
  status: "upcoming" | "completed";
}

const appointments: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. Anjali Kumar",
    speciality: "General physiotherapist",
    date: "Fri, 17th Oct '25",
    time: "11:30 A.M.",
    type: "Single session",
    price: 800,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
    location:
      "Flat 402, SP Wing, Greenview Apartments, Lush Road, Mumbai, Maharashtra - 400062",
    status: "upcoming",
  },
  {
    id: "2",
    doctorName: "Dr. Neel Naik",
    speciality: "Orthopedic physiotherapist",
    date: "Sat, 18th Oct '25",
    time: "2:00 P.M.",
    type: "Bundle - Rise (15 sessions)",
    price: 10080,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neel",
    location: "Clinic Location",
    status: "upcoming",
  },
];

export default function Appointments() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            My appointments
          </h1>
          <p className="text-gray-600">
            Manage your upcoming and past appointments
          </p>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-2xl border-2 border-cyan-400 p-6 hover:shadow-lg transition"
            >
              <div className="flex gap-6">
                {/* Doctor Image */}
                <div className="flex-shrink-0">
                  <img
                    src={appointment.image}
                    alt={appointment.doctorName}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                        Home - Visit
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {appointment.doctorName}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {appointment.speciality}
                      </p>
                    </div>
                    <button className="flex items-center gap-1 text-sm text-primary hover:opacity-80 transition">
                      ✎ Reschedule
                    </button>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Date & Time
                      </p>
                      <p className="font-semibold text-gray-800">
                        {appointment.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        {appointment.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Type
                      </p>
                      <p className="font-semibold text-gray-800">
                        {appointment.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Price
                      </p>
                      <p className="font-semibold text-gray-800">
                        ₹{appointment.price}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                        Status
                      </p>
                      <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {appointment.status === "upcoming"
                          ? "Upcoming"
                          : "Completed"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      className="bg-primary hover:bg-primary/90 text-white"
                      size="sm"
                    >
                      Join Session
                    </Button>
                    {/* <Button
                      variant="outline"
                      className="border-2 border-gray-300 text-gray-700"
                      size="sm"
                    >
                      View Details
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for Past Appointments */}
        <div className="bg-white rounded-2xl p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No past appointments
          </h3>
          <p className="text-gray-600">
            Your completed appointments will appear here
          </p>
        </div>
      </div>
    </Layout>
  );
}
