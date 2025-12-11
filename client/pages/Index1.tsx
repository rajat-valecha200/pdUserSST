import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Search, Filter, Heart, Star, X } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

interface Doctor {
  id: string;
  name: string;
  speciality: string;
  experience: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  availability: string;
  address: string;
  isNew?: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  sessions: string;
  discount?: number;
  originalPrice?: number;
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Anjali Kumar",
    speciality: "General physiotherapist",
    experience: "2 years experience",
    location: "Mumbai, Maharashtra",
    rating: 4,
    reviews: 4,
    price: 800,
    image: "/docs/anjli.png",
    availability: "Home - Visit",
    address:
      "Flat 402, SP Wing, Greenview Apartments, Lush Road, Mumbai, Maharashtra - 400062",
  },
  {
    id: "2",
    name: "Dr. Neel Naik",
    speciality: "Orthopedic physiotherapist",
    experience: "10 years experience",
    location: "Mumbai, Maharashtra",
    rating: 3,
    reviews: 3,
    price: 1000,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neel",
    availability: "Home - Visit",
    address:
      "Flat 402, SP Wing, Greenview Apartments, Lush Road, Mumbai, Maharashtra - 400062",
  },
  {
    id: "3",
    name: "Dr. Apoorvaa Kashikar",
    speciality: "Pediatric neuro",
    experience: "5 years experience",
    location: "Mumbai, Maharashtra",
    rating: 4,
    reviews: 4,
    price: 500,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Apoorvaa",
    availability: "Home - Visit",
    address:
      "Flat 402, SP Wing, Greenview Apartments, Lush Road, Mumbai, Maharashtra - 400062",
  },
  {
    id: "4",
    name: "Dr. Anjali Kumar",
    speciality: "Ergonomics & Industrial health",
    experience: "2 years experience",
    location: "Mumbai, Maharashtra",
    rating: 4,
    reviews: 4,
    price: 800,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali2",
    availability: "Home - Visit",
    address:
      "Flat 402, SP Wing, Greenview Apartments, Lush Road, Mumbai, Maharashtra - 400062",
  },
  {
    id: "5",
    name: "Dr. Neel Naik",
    speciality: "Orthopedic physiotherapist",
    experience: "12 years experience",
    location: "Mumbai, Maharashtra",
    rating: 4,
    reviews: 4,
    price: 800,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neel2",
    availability: "Home - Visit",
    address:
      "Flat 402, SP Wing, Greenview Apartments, Lush Road, Mumbai, Maharashtra - 400062",
  },
  {
    id: "6",
    name: "Dr. Apoorvaa Kashikar",
    speciality: "Musculoskeletal & sports health",
    experience: "8 years experience",
    location: "Mumbai, Maharashtra",
    rating: 4,
    reviews: 4,
    price: 500,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Apoorvaa2",
    availability: "Home - Visit",
    address:
      "Flat 402, SP Wing, Greenview Apartments, Lush Road, Mumbai, Maharashtra - 400062",
  },
];

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

const specialties = [
  "Physiotherapist",
  "Cardiologist",
  "Dermatologist",
  "Orthopedic",
  "Pediatrician",
  "General physician",
];

const locations = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Pune",
  "Hyderabad",
];

const availableDates = [
  { date: "Thu23 Oct 25", slots: 4 },
  { date: "Fri24 Oct 25", slots: 5 },
  { date: "Sat25 Oct", slots: 0 },
];

const timeSlots = ["10:00 AM", "11:30 AM", "2:00 PM", "04:30 PM"];

export default function Index() {
  const navigate = useNavigate();
  const [speciality, setSpeciality] = useState("Physiotherapist");
  const [location, setLocation] = useState("Mumbai");
  const [expandedDoctorId, setExpandedDoctorId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const expandedDoctor = mockDoctors.find((d) => d.id === expandedDoctorId);

  const handleBookAppointment = () => {
    if (expandedDoctor && selectedPlan && selectedDate && selectedTime) {
      const plan = plans.find((p) => p.id === selectedPlan);
      navigate("/cart", {
        state: {
          doctor: expandedDoctor,
          plan,
          date: selectedDate,
          time: selectedTime,
        },
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Filter Section */}
        <div className="space-y-4">
          <div className="flex gap-4 flex-wrap items-center justify-evenly">
            {/* Speciality Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSpecialtyDropdown(!showSpecialtyDropdown);
                  setShowLocationDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-200 text-purple-700 hover:bg-purple-300 transition font-medium text-sm"
              >
                <Search size={16} />
                {speciality}
                <ChevronDown size={16} />
              </button>
              {showSpecialtyDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  {specialties.map((spec) => (
                    <button
                      key={spec}
                      onClick={() => {
                        setSpeciality(spec);
                        setShowSpecialtyDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-purple-50 transition first:rounded-t-lg last:rounded-b-lg text-gray-700 text-sm"
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Location Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLocationDropdown(!showLocationDropdown);
                  setShowSpecialtyDropdown(false);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-200 text-green-700 hover:bg-green-300 transition font-medium text-sm"
              >
                <img src="/pin.png" alt="📍" className="h-[18px] w-[16px]" />{" "}
                {location}
                <ChevronDown size={16} />
              </button>
              {showLocationDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setLocation(loc);
                        setShowLocationDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-green-50 transition first:rounded-t-lg last:rounded-b-lg text-gray-700 text-sm"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Plans Section */}
        <div>
          <h2 className="text-gray-700 font-medium mb-4 flex justify-center">
            Let us choose a doctor for you
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {/* LEFT — Premiere Care (Large card in desktop) */}
            <div className="lg:row-span-2">
              <div
                className="rounded-3xl bg-gradient-to-br from-blue-400 to-yellow-300 
      p-6 text-white relative overflow-hidden h-full"
              >
                <div className="relative z-10">
                  <div className="text-sm font-medium opacity-90">
                    Premiere care
                  </div>
                  <div className="mt-4 mb-4 flex items-baseline gap-1">
                    <span className="font-montserrat font-semibold text-[64px] leading-none tracking-normal [text-shadow:0_0_20px_#E8E8E8B2]">
                      ₹2000
                    </span>
                    <span className=" font-montserrat font-medium text-[20px] leading-none tracking-normal">
                      /session
                    </span>
                  </div>
                  <div className="text-xs opacity-90 mb-6 leading-relaxed">
                    Get the best care that PockyDoc has to offer
                  </div>
                  <Button
                    size="sm"
                    className="
                      w-[120]
                      h-[40px]
                      bg-yellow-400
                      text-gray-800
                      hover:bg-yellow-500
                      font-semibold
                      rounded-[14px]
                      border-[3px]
                      border-yellow-400
                      flex items-center justify-center gap-[10px]
                      p-[10px]
                    "
                  >
                    Choose plan
                  </Button>
                </div>

                {/* <div className="absolute -bottom-8 -right-8 opacity-20">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="currentColor" />
                  </svg>
                </div> */}
              </div>
            </div>

            {/* RIGHT — Two Cards (Stacked in desktop) */}
            <div className="flex flex-col gap-4">
              {/* PockyDoc Go */}
              <div
                className="rounded-3xl bg-gradient-to-br from-green-500 to-green-200 
      p-6 text-white relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="text-sm font-medium opacity-90">
                    PockyDoc Go
                  </div>
                  <div className="mt-4 mb-4 flex items-baseline gap-1">
                    <span className="font-montserrat font-semibold text-[64px] leading-none tracking-normal [text-shadow:0_0_20px_#E8E8E8B2]">
                      ₹1000
                    </span>
                    <span className=" font-montserrat font-medium text-[20px] leading-none tracking-normal">
                      /session
                    </span>
                  </div>
                  <div className="text-xs opacity-90 mb-6 leading-relaxed">
                    Get the best care that PockyDoc has to offer
                  </div>
                  <Button
                    size="sm"
                    className="
                        w-[120px]
                        h-[40px]
                        bg-yellow-400
                        text-gray-800
                        hover:bg-yellow-500
                        font-semibold
                        rounded-[14px]
                        border-[3px]
                        border-yellow-400
                        flex items-center justify-center gap-[10px]
                        p-[10px]
                      "
                  >
                    Choose plan
                  </Button>
                </div>
              </div>
              {/* Plus Care */}
              <div
                className="rounded-3xl bg-gradient-to-br from-pink-300 to-yellow-200 
      p-6 text-white relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="text-sm font-medium opacity-90">
                    Plus care
                  </div>
                  <div className="mt-4 mb-4 flex items-baseline gap-1">
                    <span className="font-montserrat font-semibold text-[64px] leading-none tracking-normal [text-shadow:0_0_20px_#E8E8E8B2]">
                      ₹800
                    </span>
                    <span className=" font-montserrat font-medium text-[20px] leading-none tracking-normal">
                      /session
                    </span>
                  </div>
                  <div className="text-xs opacity-90 mb-6 leading-relaxed">
                    Get the best care that PockyDoc has to offer
                  </div>
                  <Button
                    size="sm"
                    className="
                      w-[120px]
                      h-[40px]
                      bg-yellow-400
                      text-gray-800
                      hover:bg-yellow-500
                      font-semibold
                      rounded-[14px]
                      border-[3px]
                      border-yellow-400
                      flex items-center justify-center gap-[10px]
                      p-[10px]
                    "
                  >
                    Choose plan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor List Section */}
        <div>
          <h3 className="text-gray-700 font-medium mb-4 flex justify-center gap-16">
            <span> Or choose from a list of handpicked specialists </span>
            <span>
              <Filter className="inline" size={16} /> Filter{" "}
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockDoctors.map((doctor) => (
              <div key={doctor.id}>
                {/* Doctor Card */}
                <button
                  onClick={() => {
                    setExpandedDoctorId(
                      expandedDoctorId === doctor.id ? null : doctor.id,
                    );
                    setSelectedPlan(null);
                    setSelectedDate(null);
                    setSelectedTime(null);
                  }}
                  className="w-full text-left"
                >
                  <div className="bg-white rounded-3xl  p-6 hover:shadow-lg transition cursor-pointer group">
                    <div className="flex gap-4">
                      {/* Doctor Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      </div>

                      {/* Doctor Info */}
                      <div className="flex-1">
                        <div className="mb-4 inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">
                          {doctor.availability}
                        </div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-800 group-hover:text-primary transition">
                              {doctor.name}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">
                              {doctor.speciality}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {doctor.experience}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              <img
                                src="/black-pin.png"
                                alt="📍"
                                className="h-[14px] w-[12px] inline"
                              />{" "}
                              {doctor.location}
                            </p>
                          </div>
                        </div>

                        {/* Price and Rating */}
                        <div>
                          <span className="text-lg font-bold text-gray-800">
                            ₹{doctor.price}
                          </span>
                          <span className="text-xs text-gray-500">
                            /session
                          </span>
                        </div>
                        {/* Rating */}
                        <div className="flex items-center gap-1">
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

                    {/* Badge */}
                  </div>
                </button>

                {/* Expanded Content */}
                {expandedDoctorId === doctor.id && (
                  <div className="bg-white rounded-b-3xl mt-[-20px] p-6 space-y-6 mb-4">
                    {/* Back Link */}
                    {/* <button
                      onClick={() => {
                        setExpandedDoctorId(null);
                        setSelectedPlan(null);
                        setSelectedDate(null);
                        setSelectedTime(null);
                      }}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 transition font-medium text-sm"
                    >
                      <ChevronDown size={16} className="rotate-90" />
                      Back
                    </button> */}
                    <div className="border-t border-[#333333] opacity-20"></div>

                    <p
                      className="font-montserrat font-semibold text-[14px] leading-none tracking-normal
    text-[#333333]"
                    >
                      Please select the type of session you would like to book.
                    </p>

                    {/* Plans Section */}
                    <div className="space-y-3">
                      {plans.map((plan) => (
                        <label
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan.id)}
                          className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary/50 transition bg-white"
                        >
                          <div className="flex-shrink-0 mt-1">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                                selectedPlan === plan.id
                                  ? "border-primary bg-primary"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedPlan === plan.id && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">
                              {plan.name}
                            </div>
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

                    {/* Date and Time Selection */}
                    {selectedPlan && (
                      <div className="border-t-2 border-gray-200 pt-6 space-y-6">
                        {/* Pick Appointment Slot Text */}
                        <div>
                          <p className="text-gray-700 font-semibold text-sm mb-4">
                            Pick your appointment slot
                          </p>

                          {/* Date Selection */}
                          <div className="space-y-3">
                            {availableDates.map((d) => (
                              <button
                                key={d.date}
                                onClick={() => setSelectedDate(d.date)}
                                disabled={d.slots === 0}
                                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition font-medium text-sm ${
                                  selectedDate === d.date
                                    ? "border-primary bg-blue-50 text-primary"
                                    : d.slots === 0
                                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                      : "border-gray-200 bg-white text-gray-700 hover:border-primary/50"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{d.date}</span>
                                  {d.slots > 0 && (
                                    <span className="text-xs opacity-75">
                                      {d.slots > 1
                                        ? `${d.slots} hours`
                                        : `${d.slots} hour`}
                                    </span>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Time Selection */}
                        {selectedDate && (
                          <div className="space-y-3">
                            <div className="grid grid-cols-4 gap-2">
                              {timeSlots.map((time) => (
                                <button
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  className={`px-3 py-2 rounded-lg border-2 transition font-medium text-xs ${
                                    selectedTime === time
                                      ? "border-primary bg-primary text-white"
                                      : "border-gray-200 bg-white text-gray-700 hover:border-primary/50"
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Book Button */}
                        {selectedTime && (
                          <Button
                            onClick={handleBookAppointment}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl mt-4"
                            size="lg"
                          >
                            Book appointment
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Floating Action Button */}
        <button className="fixed bottom-8 right-8 w-16 h-16 bg-brand-blue text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition flex items-center justify-center">
          <Heart size={24} fill="white" />
        </button>
      </div>
    </Layout>
  );
}
