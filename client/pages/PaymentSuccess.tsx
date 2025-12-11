import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;

  if (!state || !state.doctor) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No payment data
          </h2>
          <Button onClick={() => navigate("/")} className="bg-primary">
            Back to home
          </Button>
        </div>
      </Layout>
    );
  }

  const { doctor, plan, date, time, discount, total } = state;

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-12">
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <CheckCircle size={48} className="text-white" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment successful
          </h1>
          <p className="text-gray-600 mb-8">
            Your appointment has been booked!
          </p>

          {/* Divider */}
          <div className="border-t-2 border-dashed border-gray-300 my-6"></div>

          {/* Total Payment */}
          <div className="mb-8">
            <p className="text-gray-600 text-sm mb-2">Total payment</p>
            <p className="text-5xl font-bold text-gray-800">₹{total}</p>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-dashed border-gray-300 my-6"></div>

          {/* Appointment Details */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left">
            <div className="flex gap-4 mb-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div className="inline-block bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                  Home - Visit
                </div>
                <h3 className="font-bold text-gray-800 text-sm">
                  {doctor.name}
                </h3>
                <p className="text-gray-600 text-xs">{doctor.speciality}</p>
                <p className="text-gray-500 text-xs mt-1">
                  📍 {doctor.location}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">On:</span>
                <span className="text-gray-600">{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">At:</span>
                <span className="text-gray-600">{time}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <p className="text-gray-700 font-semibold text-sm mb-2">
                {doctor.speciality}
              </p>
              <p className="text-gray-600 text-xs">{doctor.address}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-gray-600 text-sm">Paid through Gpay</p>
          </div>

          {/* Back Home Button */}
          <Button
            onClick={() => navigate("/")}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl mb-4"
          >
            Back home
          </Button>

          {/* View Appointment Button */}
          <Button
            onClick={() => navigate("/appointments")}
            variant="outline"
            className="w-full border-2 border-primary text-primary hover:bg-primary/5 font-bold py-3 rounded-xl"
          >
            View appointment
          </Button>
        </div>
      </div>
    </Layout>
  );
}
