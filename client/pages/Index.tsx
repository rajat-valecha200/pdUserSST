import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Search, Filter, Heart, Star } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import DoctorCard from "@/components/DoctorCard";

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

  const handleDoctorExpand = (doctorId: string) => {
    if (expandedDoctorId === doctorId) {
      // Clicking the same card - close it
      setExpandedDoctorId(null);
      setSelectedPlan(null);
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      // Clicking a different card - open it
      setExpandedDoctorId(doctorId);
      setSelectedPlan(null);
      setSelectedDate(null);
      setSelectedTime(null);
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
            {/* Premiere Care */}
            <div className="lg:row-span-2">
              <div className="rounded-3xl bg-gradient-to-br from-blue-400 to-yellow-300 p-6 text-white relative overflow-hidden h-full">
                <div className="relative z-10">
                  <div className="text-sm font-medium opacity-90">Premiere care</div>
                  <div className="mt-4 mb-4 flex items-baseline gap-1">
                    <span className="font-montserrat font-semibold text-[64px] leading-none tracking-normal [text-shadow:0_0_20px_#E8E8E8B2]">
                      ₹2000
                    </span>
                    <span className="font-montserrat font-medium text-[20px] leading-none tracking-normal">
                      /session
                    </span>
                  </div>
                  <div className="text-xs opacity-90 mb-6 leading-relaxed">
                    Get the best care that PockyDoc has to offer
                  </div>
                  <Button
                    size="sm"
                    className="w-[120px] h-[40px] bg-yellow-400 text-gray-800 hover:bg-yellow-500 font-semibold rounded-[14px] border-[3px] border-yellow-400 flex items-center justify-center gap-[10px] p-[10px]"
                  >
                    Choose plan
                  </Button>
                </div>
              </div>
            </div>

            {/* PockyDoc Go and Plus Care */}
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl bg-gradient-to-br from-green-500 to-green-200 p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-sm font-medium opacity-90">PockyDoc Go</div>
                  <div className="mt-4 mb-4 flex items-baseline gap-1">
                    <span className="font-montserrat font-semibold text-[64px] leading-none tracking-normal [text-shadow:0_0_20px_#E8E8E8B2]">
                      ₹1000
                    </span>
                    <span className="font-montserrat font-medium text-[20px] leading-none tracking-normal">
                      /session
                    </span>
                  </div>
                  <div className="text-xs opacity-90 mb-6 leading-relaxed">
                    Get the best care that PockyDoc has to offer
                  </div>
                  <Button
                    size="sm"
                    className="w-[120px] h-[40px] bg-yellow-400 text-gray-800 hover:bg-yellow-500 font-semibold rounded-[14px] border-[3px] border-yellow-400 flex items-center justify-center gap-[10px] p-[10px]"
                  >
                    Choose plan
                  </Button>
                </div>
              </div>
              
              <div className="rounded-3xl bg-gradient-to-br from-pink-300 to-yellow-200 p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-sm font-medium opacity-90">Plus care</div>
                  <div className="mt-4 mb-4 flex items-baseline gap-1">
                    <span className="font-montserrat font-semibold text-[64px] leading-none tracking-normal [text-shadow:0_0_20px_#E8E8E8B2]">
                      ₹800
                    </span>
                    <span className="font-montserrat font-medium text-[20px] leading-none tracking-normal">
                      /session
                    </span>
                  </div>
                  <div className="text-xs opacity-90 mb-6 leading-relaxed">
                    Get the best care that PockyDoc has to offer
                  </div>
                  <Button
                    size="sm"
                    className="w-[120px] h-[40px] bg-yellow-400 text-gray-800 hover:bg-yellow-500 font-semibold rounded-[14px] border-[3px] border-yellow-400 flex items-center justify-center gap-[10px] p-[10px]"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            {mockDoctors.map((doctor, index) => (
            //   <div
            //     key={doctor.id}
            //     // className={expandedDoctorId === doctor.id ? "col-span-2" : ""}
            //   >
                <DoctorCard
                  doctor={doctor}
                  isExpanded={expandedDoctorId === doctor.id}
                  onExpand={() => handleDoctorExpand(doctor.id)}
                  selectedPlan={selectedPlan}
                  onPlanSelect={setSelectedPlan}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  selectedTime={selectedTime}
                  onTimeSelect={setSelectedTime}
                  onBookAppointment={handleBookAppointment}
                />
            //   </div>
            ))}
          </div>
        </div>

        {/* Floating Action Button */}
        {/* <button className="fixed bottom-8 right-8 w-16 h-16 bg-brand-blue text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition flex items-center justify-center">
          <Heart size={24} fill="white" />
        </button> */}
      </div>
    </Layout>
  );
}
