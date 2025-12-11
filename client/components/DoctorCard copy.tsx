import { Star } from "lucide-react";

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
}

interface Plan {
  id: string;
  name: string;
  price: number;
  sessions: string;
  discount?: number;
  originalPrice?: number;
}

interface DoctorCardProps {
  doctor: Doctor;
  isExpanded: boolean;
  onExpand: () => void;
  selectedPlan: string | null;
  onPlanSelect: (planId: string) => void;
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  onBookAppointment: () => void;
}

export default function DoctorCard({
  doctor,
  isExpanded,
  onExpand,
  selectedPlan,
  onPlanSelect,
  selectedDate,
  onDateSelect,
  selectedTime,
  onTimeSelect,
  onBookAppointment,
}: DoctorCardProps) {
  const cardPlans: Plan[] = [
    { id: "1", name: "Single session", price: 800, sessions: "1" },
    {
      id: "2",
      name: "Rise",
      price: 5142,
      sessions: "7",
      discount: 8,
      originalPrice: 5600,
    },
    {
      id: "3",
      name: "Shine",
      price: 10080,
      sessions: "14",
      discount: 10,
      originalPrice: 11200,
    },
    {
      id: "4",
      name: "Shine",
      price: 21120,
      sessions: "30",
      discount: 12,
      originalPrice: 24000,
    },
  ];

  const cardAvailableDates = [
    { date: "Thu,23 Oct '25", slots: 4 },
    { date: "Fri,24 Oct '25", slots: 10 },
    { date: "Sat,25 Oct '25", slots: 0 },
  ];

  const cardTimeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

  // COMPACT VIEW
  if (!isExpanded) {
    return (
      <div
        onClick={onExpand}
        className="bg-white rounded-3xl p-6 hover:shadow-lg transition cursor-pointer group h-fit"
      >
        <div className="flex gap-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover"
          />

          <div className="flex-1">
            <div className="mb-2 inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">
              {doctor.availability}
            </div>

            <h4 className="font-semibold text-gray-800 group-hover:text-primary transition">
              {doctor.name}
            </h4>
            <p className="text-xs text-gray-600 mt-1">{doctor.speciality}</p>
            <p className="text-xs text-gray-500 mt-1">{doctor.experience}</p>

            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <img src="/black-pin.png" className="h-3 w-3" />
              {doctor.location}
            </p>

            <div className="mt-2">
              <span className="text-lg font-bold text-gray-800">
                ₹{doctor.price}
              </span>
              <span className="text-xs text-gray-500 ml-1">/session</span>
            </div>

            <div className="flex items-center gap-1 mt-1">
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
              <span className="text-xs text-gray-600 ml-1">
                {doctor.rating} out of 5
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EXPANDED VIEW
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-blue-500 ">
      {/* HEADER (click to collapse) */}
      <div onClick={onExpand} className="cursor-pointer">
        <div className="flex gap-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover"
          />

          <div className="flex-1">
            <div className="mb-2 inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">
              {doctor.availability}
            </div>

            <h4 className="font-semibold text-gray-800">{doctor.name}</h4>
            <p className="text-xs text-gray-600 mt-1">{doctor.speciality}</p>
            <p className="text-xs text-gray-500 mt-1">{doctor.experience}</p>

            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <img src="/black-pin.png" className="h-3 w-3" />
              {doctor.location}
            </p>

            <div className="mt-2">
              <span className="text-lg font-bold text-gray-800">
                ₹{doctor.price}
              </span>
              <span className="text-xs text-gray-500 ml-1">/session</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING UI BELOW */}
      <div className="mt-6 border-t pt-6" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-semibold text-gray-700 mb-6">
          Please select the type of session you would like to book.
        </p>

        {/* PLANS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {cardPlans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => onPlanSelect(plan.id)}
                className="relative flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all border-gray-200 bg-white hover:border-gray-300"
              >
              {/* <div
                key={plan.id}
                onClick={() => onPlanSelect(plan.id)}
                className={`relative flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all 
        ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
              > */}
                {/* RADIO BUTTON */}
                <input
                  type="radio"
                  name="plan"
                  checked={isSelected}
                  onChange={() => onPlanSelect(plan.id)}
                  className="w-5 h-5 mt-1 accent-blue-600 cursor-pointer"
                />

                {/* CARD DETAILS */}
                <div className="flex-1">
                  <div className="font-[Montserrat] font-semibold text-[16px] text-[#333333]">
                    {plan.name}{" "}
                    {parseInt(plan.sessions) > 1 && (
                      <span className="text-[11px] font-[Montserrat] font-semibold text-[#333333]">
                        ({plan.sessions} sessions)
                      </span>
                    )}
                  </div>

                  <div
                    className="my-2 w-full h-[1px]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to right, #999999 0 10px, transparent 10px 20px)",
                    }}
                  ></div>

                  {plan.discount && (
                    <div className="flex items-center gap-2">
                      <Star
                        size={14}
                        className="fill-[#FFCC00] text-[#FFCC00]"
                      />
                      <div className="text-[#0152FF] font-bold mt-1 flex items-center text-[16px] font-[Montserrat]">
                        {plan.discount}% OFF
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-2">
                    <div className="font-[Montserrat] font-bold text-[24px] leading-[29px] flex items-center text-[#333333]">
                      ₹{plan.price.toLocaleString()}
                    </div>

                    {plan.originalPrice && (
                      <div className="font-[Montserrat] font-medium text-[12px] leading-[15px] text-[rgba(51,51,51,0.7)] flex items-center line-through">
                        ₹{plan.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DATE SLOTS */}
        {selectedPlan && (
          <>
            <p className="text-sm font-medium text-gray-700 text-center mb-4">
              Pick your appointment slot
            </p>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {cardAvailableDates.map((d) => (
                <button
                  key={d.date}
                  onClick={() => d.slots > 0 && onDateSelect(d.date)}
                  disabled={d.slots === 0}
                  className={`flex-shrink-0 w-32 px-4 py-3 rounded-2xl border-2 transition-all ${
                    selectedDate === d.date
                      ? "border-blue-500 bg-blue-500 text-white"
                      : d.slots === 0
                        ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-500"
                  }`}
                >
                  <div className="text-sm font-semibold text-center">
                    {d.date}
                  </div>
                  <div className="text-xs text-center mt-1">
                    {d.slots} {d.slots === 1 ? "Slot" : "Slots"}
                  </div>
                </button>
              ))}
            </div>

            {/* TIME SLOTS */}
            {selectedDate && (
              <div className="flex gap-3 justify-center">
                {cardTimeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => onTimeSelect(time)}
                    className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium ${
                      selectedTime === time
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-blue-500"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}

            {/* BOOK BUTTON */}
            {selectedTime && (
              <button
                onClick={onBookAppointment}
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-2xl mt-6 hover:bg-blue-600"
              >
                Book appointment
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
