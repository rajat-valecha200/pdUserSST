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
      name: "Conquer",
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

  // ------------------------------------
  // COMPACT VIEW
  // ------------------------------------
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
                    size={16}
                    className={
                      i < Math.floor(doctor.rating)
                        ? "fill-[#4CA200] text-[#4CA200]"
                        : "text-[#4CA20080] fill-[#4CA20020]"
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

  // ------------------------------------
  // EXPANDED VIEW
  // ------------------------------------
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border-2">
      {/* HEADER */}
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
            <div className="flex items-center gap-1 mt-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(doctor.rating)
                        ? "fill-[#4CA200] text-[#4CA200]"
                        : "text-[#4CA20080] fill-[#4CA20020]"
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

      {/* BOOKING UI BELOW */}
      <div className="mt-6 border-t pt-6" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-semibold text-gray-700 mb-6">
          Please select the type of session you would like to book.
        </p>

        {/* ---------------- PLANS GRID ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {cardPlans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => onPlanSelect(plan.id)}
                className={`relative flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all 
                  ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
              >
                {/* RADIO BUTTON */}
                <input
                  type="radio"
                  name="plan"
                  checked={isSelected}
                  onChange={() => onPlanSelect(plan.id)}
                  className="w-5 h-5 mt-1 accent-blue-600 cursor-pointer"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <div className="font-[Montserrat] font-semibold text-[16px] text-[#333333]">
                    {plan.name}{" "}
                    {parseInt(plan.sessions) > 1 && (
                      <span className="text-[11px] font-[Montserrat] font-semibold text-[#333333]">
                        ({plan.sessions} sessions)
                      </span>
                    )}
                  </div>

                  {/* DASHED SEPARATOR */}
                  <div
                    className="my-2 w-full h-[1px]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to right, #999999 0 10px, transparent 10px 20px)",
                    }}
                  ></div>

                  {/* DISCOUNT */}
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

                  {/* PRICES */}
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

        {/* ----------------------------------------- */}
        {/*       CONDITIONAL LOGIC FOR PLANS         */}
        {/* ----------------------------------------- */}

        {/* DATE + TIME AREA — Figma Styled */}
        {selectedPlan &&
          (() => {
            const selected = cardPlans.find((p) => p.id === selectedPlan);
            const isSingle = selected && parseInt(selected.sessions) === 1;

            if (!isSingle) {
              return (
                <button
                  onClick={onBookAppointment}
                  className="mx-auto flex justify-center items-center px-6 py-3 bg-[#0241ED] border-[2.5px] border-[#0241ED] text-white font-semibold rounded-[14px] mt-6 hover:bg-[#0237c8] w-[250px] h-[44px]"
                >
                  Buy Session
                </button>
              );
            }

            return (
              <>
                <div className="border-[0.5px] border-[#D6D4D0] rounded-[14px] shadow-[0_0_30px_rgba(232,232,232,0.7)] m-2 px-1 py-4 flex flex-col gap-4">
                  {/* TITLE */}
                  {/* DATE SELECTOR */}
                  <p className="text-sm font-medium text-gray-700 text-center mb-4">
                    Pick your appointment slot
                  </p>

                  <div className="relative w-full mb-4">
                    {/* LEFT ARROW */}
                    <button
                      onClick={() => {
                        const scroller =
                          document.getElementById("dateScroller");
                        scroller?.scrollBy({ left: -200, behavior: "smooth" });
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#0152FF] flex items-center justify-center shadow"
                    >
                      <svg
                        width="12"
                        height="12"
                        fill="white"
                        viewBox="0 0 7 12"
                      >
                        <path d="M5.6 0.3 0.5 5.4c-.2.2-.5.6-.5.9 0 .3.1.6.4.9l5.1 5.1c.3.3.7.4 1.1.3.4-.1.7-.5.8-.9.1-.4-.1-.8-.4-1.1L2.1 6l4.4-4.4c.3-.3.5-.7.4-1.1-.1-.4-.4-.8-.8-.9-.4-.1-.8 0-1.1.3z" />
                      </svg>
                    </button>

                    {/* SCROLL AREA */}
                    <div
                      id="dateScroller"
                      className="flex gap-4 overflow-x-auto px-10 scroll-smooth snap-x snap-mandatory"
                      style={{
                        scrollBehavior: "smooth",
                        msOverflowStyle: "none",
                        scrollbarWidth: "none",
                      }}
                    >
                      {cardAvailableDates.map((d) => (
                        <button
                          key={d.date}
                          onClick={() => d.slots > 0 && onDateSelect(d.date)}
                          disabled={d.slots === 0}
                          className={`snap-center flex-shrink-0 w-40 px-4 py-3 rounded-2xl border transition-all shadow-sm 
                        ${
                          selectedDate === d.date
                            ? "border-[#12D8FA] bg-[#1FA2FF] text-white"
                            : d.slots === 0
                              ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "border-gray-200 bg-white text-gray-700 hover:border-blue-500"
                        }`}
                        >
                          <div className="text-[16px] font-semibold text-center leading-none">
                            {d.date}
                          </div>
                          <div className="text-[14px] text-center mt-4 leading-none">
                            {d.slots} {d.slots === 1 ? "Slot" : "Slots"}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* RIGHT ARROW */}
                    <button
                      onClick={() => {
                        const scroller =
                          document.getElementById("dateScroller");
                        scroller?.scrollBy({ left: 200, behavior: "smooth" });
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#0152FF] flex items-center justify-center shadow"
                    >
                      <svg
                        width="12"
                        height="12"
                        fill="white"
                        viewBox="0 0 7 12"
                      >
                        <path d="M1.3 11.7 6.4 6.6c.2-.2.5-.6.5-.9 0-.3-.1-.6-.4-.9L1.4 0c-.3-.3-.7-.4-1.1-.3-.4.1-.7.5-.8.9-.1.4.1.8.4 1.1L4.9 6 .5 10.4c-.3.3-.5.7-.4 1.1.1.4.4.8.8.9.4.1.8 0 1.1-.3z" />
                      </svg>
                    </button>
                  </div>

                  {/* FADE EFFECT (only when content overflows) */}
                  <div className="pointer-events-none absolute top-[92px] left-0 w-10 h-[76px] bg-gradient-to-r from-white"></div>
                  <div className="pointer-events-none absolute top-[92px] right-0 w-10 h-[76px] bg-gradient-to-l from-white"></div>

                  {/* --------- TIME SLOTS (FIGMA STYLE) --------- */}
                  {selectedDate && (
                    <div className="flex gap-4 justify-center flex-wrap">
                      {cardTimeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => onTimeSelect(t)}
                          className={`px-4 py-2 rounded-full border text-sm font-medium 
                ${
                  selectedTime === t
                    ? "bg-[#1FA2FF] border-[#12D8FA] text-white"
                    : "bg-white border-[#12D8FA] text-[#333]"
                }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* BUTTON */}
                {selectedTime && (
                  <button
                    onClick={onBookAppointment}
                    className="mx-auto flex justify-center items-center px-6 py-3 bg-[#0241ED] border-[2.5px] border-[#0241ED] text-white font-semibold rounded-[14px] mt-6 hover:bg-[#0237c8] w-[250px] h-[44px]"
                  >
                    Book appointment
                  </button>
                  
                )}
              </>
            );
          })()}
      </div>
    </div>
  );
}
