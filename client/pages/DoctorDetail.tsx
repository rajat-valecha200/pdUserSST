import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Star, MapPin, Calendar, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

interface Plan {
  id: string;
  name: string;
  price: number;
  sessions: string;
  discount?: number;
  originalPrice?: number;
}

const plans: Plan[] = [
  {
    id: "1",
    name: "Single session",
    price: 800,
    sessions: "1",
  },
  {
    id: "2",
    name: "Bundle - Rise",
    price: 10080,
    sessions: "15 sessions",
    discount: 16,
    originalPrice: 12000,
  },
  {
    id: "3",
    name: "Bundle - Shine",
    price: 21120,
    sessions: "30 sessions",
    discount: 12,
    originalPrice: 24000,
  },
];

const availableDates = [
  { date: "Thu23 Oct 25", slots: 4 },
  { date: "Fri24 Oct 25", slots: 5 },
  { date: "Sat25 Oct", slots: 0 },
];

const timeSlots = ["10:00 AM", "11:30 AM", "2:00 PM", "04:30 PM"];

export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Mock doctor data
  const doctor = {
    name: "Dr. Anjali Kumar",
    speciality: "General physiotherapist",
    experience: "2 years experience",
    location: "Mumbai, Maharashtra",
    rating: 4,
    reviews: 4,
    price: 800,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
    address:
      "Flat 402, SP Wing, Greenview Apartments, Lush Road, Mumbai, Maharashtra - 400062",
  };

  const canProceed = selectedPlan && selectedDate && selectedTime;

  const handleProceed = () => {
    if (canProceed) {
      const plan = plans.find((p) => p.id === selectedPlan);
      navigate("/cart", {
        state: {
          doctor,
          plan,
          date: selectedDate,
          time: selectedTime,
        },
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition font-medium"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        {/* Doctor Card */}
        <div className="bg-white rounded-2xl border-2 border-cyan-400 p-6">
          <div className="flex gap-4 mb-6">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                Home - Visit
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                {doctor.name}
              </h1>
              <p className="text-gray-600 text-sm mt-1">{doctor.speciality}</p>
              <p className="text-gray-500 text-xs mt-2">{doctor.experience}</p>
              <p className="text-gray-500 text-xs mt-1">📍 {doctor.location}</p>
              <p className="text-gray-500 text-xs mt-2">{doctor.address}</p>

              <div className="flex items-center gap-2 mt-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.floor(doctor.rating)
                          ? "fill-green-500 text-green-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  {doctor.reviews} out of 5
                </span>
              </div>
            </div>
          </div>

          {/* Plans Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              Select your plan
            </h3>

            <div className="space-y-3">
              {plans.map((plan) => (
                <label
                  key={plan.id}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition"
                >
                  <input
                    type="radio"
                    name="plan"
                    value={plan.id}
                    checked={selectedPlan === plan.id}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">
                      {plan.name}
                    </div>
                    <div className="text-sm text-gray-600">{plan.sessions}</div>
                    {plan.discount && (
                      <div className="text-xs text-green-600 font-semibold mt-1">
                        {plan.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">
                      ₹{plan.price}
                    </div>
                    {plan.originalPrice && (
                      <div className="text-xs text-gray-400 line-through">
                        ₹{plan.originalPrice}
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Date and Time Selection */}
        {selectedPlan && (
          <div className="bg-white rounded-2xl border-2 border-cyan-400 p-6 space-y-6">
            <h3 className="font-semibold text-gray-800">
              Pick your appointment slot
            </h3>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Date
              </label>
              <div className="flex gap-3 flex-wrap">
                {availableDates.map((d) => (
                  <button
                    key={d.date}
                    onClick={() => setSelectedDate(d.date)}
                    disabled={d.slots === 0}
                    className={`px-4 py-2 rounded-full border-2 transition font-medium text-sm ${
                      selectedDate === d.date
                        ? "border-primary bg-primary text-white"
                        : d.slots === 0
                          ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "border-gray-200 bg-white text-gray-700 hover:border-primary"
                    }`}
                  >
                    {d.date}
                    {d.slots > 0 && (
                      <div className="text-xs opacity-75 mt-1">
                        {d.slots} slots
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 rounded-lg border-2 transition font-medium text-sm ${
                        selectedTime === time
                          ? "border-primary bg-primary text-white"
                          : "border-gray-200 bg-white text-gray-700 hover:border-primary"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Proceed Button */}
            {selectedTime && (
              <Button
                onClick={handleProceed}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl"
                size="lg"
              >
                Book appointment
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
