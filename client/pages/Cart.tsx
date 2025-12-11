import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, X } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

interface Coupon {
  id: string;
  title: string;
  discount: number;
  type: "percentage" | "flat";
  description: string;
  badge: string;
  badgeColor: string;
  validity: string;
}

const coupons: Coupon[] = [
  {
    id: "1",
    title: "Patient loyalty discount",
    discount: 10,
    type: "percentage",
    description:
      "As part of our patient loyalty program, enjoy special discounts on consultations and treatments - our way of thanking you for your continued trust.",
    badge: "10% OFF",
    badgeColor: "bg-blue-500",
    validity: "7 days",
  },
  {
    id: "2",
    title: "Support remediation",
    discount: 20,
    type: "percentage",
    description:
      "Get exclusive savings on your support remediation services. Resolve issues quickly and efficiently with our expert assistance.",
    badge: "20% OFF",
    badgeColor: "bg-pink-500",
    validity: "6 days",
  },
  {
    id: "3",
    title: "Marketplace discount",
    discount: 5,
    type: "percentage",
    description:
      "Enjoy an exclusive discount on your next consultation or treatment. Book now and make the most of this limited-time offer.",
    badge: "05% OFF",
    badgeColor: "bg-orange-500",
    validity: "18 days",
  },
];

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showCoupons, setShowCoupons] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const state = location.state as any;

  if (!state || !state.doctor) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No booking data
          </h2>
          <Link to="/" className="text-primary hover:text-primary/80">
            Back to home
          </Link>
        </div>
      </Layout>
    );
  }

  const { doctor, plan, date, time } = state;
  const appointmentFee = plan.price;
  const platformFee = 30;
  const tax = 0;
  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.floor((appointmentFee * appliedCoupon.discount) / 100)
      : appliedCoupon.discount
    : 0;
  const grandTotal = appointmentFee + platformFee + tax - discount;

  const handleApplyCoupon = (coupon: Coupon) => {
    setAppliedCoupon(coupon);
    setShowCoupons(false);
  };

  const handlePayment = () => {
    navigate("/payment-success", {
      state: {
        doctor,
        plan,
        date,
        time,
        discount,
        total: grandTotal,
      },
    });
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition font-medium"
          >
            <ChevronLeft size={20} />
            Doctor's list
          </button>

          {/* Doctor Info Card */}
          <div className="bg-white rounded-2xl border-2 border-cyan-400 p-6">
            <div className="flex gap-4 mb-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  Home - Visit
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {doctor.name}
                </h2>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                <p className="text-gray-500 text-xs mt-2">{doctor.address}</p>
              </div>
            </div>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white rounded-2xl border-2 border-cyan-400 p-6">
            <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-200">
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">
                  Date
                </label>
                <p className="text-lg font-bold text-gray-800 mt-2">{date}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">
                  Time
                </label>
                <p className="text-lg font-bold text-gray-800 mt-2">{time}</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase">
                Purchase type
              </label>
              <p className="text-xl font-bold text-gray-800 mt-2">
                {plan.name}
              </p>
              <p className="text-sm text-gray-600 mt-2">{plan.sessions}</p>
            </div>
          </div>

          {/* Coupon Section */}
          <div className="bg-white rounded-2xl p-6">
            <button
              onClick={() => setShowCoupons(!showCoupons)}
              className="flex items-center justify-between w-full hover:opacity-80 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎟️</span>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">
                    {appliedCoupon ? "Coupon Applied" : "View coupons"}
                  </p>
                  {appliedCoupon && (
                    <p className="text-sm text-gray-600">
                      {appliedCoupon.title}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-gray-400">→</div>
            </button>

            {/* Coupons Panel */}
            {showCoupons && (
              <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
                {coupons.map((coupon) => (
                  <button
                    key={coupon.id}
                    onClick={() => handleApplyCoupon(coupon)}
                    className="w-full p-4 rounded-lg bg-gradient-to-r text-white text-left hover:shadow-lg transition relative overflow-hidden"
                    style={{
                      background:
                        coupon.id === "1"
                          ? "linear-gradient(135deg, #5B9FF8 0%, #3B5BDB 100%)"
                          : coupon.id === "2"
                            ? "linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)"
                            : "linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)",
                    }}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <p className="font-bold text-lg">{coupon.badge}</p>
                        <p className="text-sm opacity-90 mt-1">
                          {coupon.title}
                        </p>
                        <p className="text-xs opacity-75 mt-2">
                          {coupon.validity}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        🎟️
                      </div>
                    </div>
                    <p className="text-xs opacity-80 mt-3 leading-relaxed">
                      {coupon.description}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">
              Order summary
            </h3>

            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm uppercase">
                  Appointment fee
                </span>
                <span className="font-semibold text-gray-800">
                  ₹{appointmentFee}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm uppercase">
                  Platform fee
                </span>
                <span className="font-semibold text-gray-800">
                  ₹{platformFee}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm uppercase">Tax</span>
                <span className="font-semibold text-gray-800">₹{tax}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <span className="text-sm uppercase">Discount</span>
                  <span className="font-semibold">-₹{discount}</span>
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div className="mt-6 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white">
              <p className="text-sm opacity-90 mb-2">Grand total</p>
              <div className="flex justify-between items-center">
                <span className="text-4xl font-bold">₹{grandTotal}</span>
                <span className="text-sm opacity-75">Proceed to pay →</span>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600 leading-relaxed">
              <p className="font-semibold text-gray-700 mb-2">
                Cancellation policy
              </p>
              <p>
                Free cancellation of appointments up to 24 hours in advance of
                the scheduled date. Cancellations made 24 hours or less before
                the scheduled appointment date may be charged in full. If a
                doctor cancels, you'll receive a full refund of the option to
                reschedule. Defaults, if applicable, are processed within 5-7
                business days.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Button (Sticky on mobile) */}
        <div className="lg:col-span-2 lg:col-start-1 fixed bottom-0 left-0 right-0 bg-secondary p-6 lg:static lg:bg-transparent lg:p-0">
          <Button
            onClick={handlePayment}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl text-lg"
          >
            Proceed to pay
          </Button>
        </div>
      </div>
    </Layout>
  );
}
