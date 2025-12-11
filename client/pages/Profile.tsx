import { User, Mail, Phone, MapPin, LogOut } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

export default function Profile() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border-2 border-cyan-400 p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-4xl font-bold">
                A
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Approvia Sashi
                </h1>
                <p className="text-gray-600 text-sm mt-2">Member since 2024</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Email
                </label>
                <p className="text-gray-800 font-medium mt-1">
                  approvia@email.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Phone
                </label>
                <p className="text-gray-800 font-medium mt-1">+91 9876543210</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <MapPin size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Location
                </label>
                <p className="text-gray-800 font-medium mt-1">
                  Mumbai, Maharashtra
                </p>
              </div>
            </div>

            {/* Member */}
            <div className="flex items-start gap-4">
              <User size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Member Type
                </label>
                <p className="text-gray-800 font-medium mt-1">Premium</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Account Settings
          </h2>

          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition rounded-lg flex items-center justify-between">
            <span className="font-medium text-gray-800">Edit Profile</span>
            <span className="text-gray-400">→</span>
          </button>

          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition rounded-lg flex items-center justify-between">
            <span className="font-medium text-gray-800">Change Password</span>
            <span className="text-gray-400">→</span>
          </button>

          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition rounded-lg flex items-center justify-between">
            <span className="font-medium text-gray-800">Saved Addresses</span>
            <span className="text-gray-400">→</span>
          </button>

          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition rounded-lg flex items-center justify-between">
            <span className="font-medium text-gray-800">
              Notification Settings
            </span>
            <span className="text-gray-400">→</span>
          </button>
        </div>

        {/* Help & Support */}
        <div className="bg-white rounded-2xl p-8 space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Help & Support
          </h2>

          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition rounded-lg flex items-center justify-between">
            <span className="font-medium text-gray-800">FAQ</span>
            <span className="text-gray-400">→</span>
          </button>

          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition rounded-lg flex items-center justify-between">
            <span className="font-medium text-gray-800">Contact Support</span>
            <span className="text-gray-400">→</span>
          </button>

          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition rounded-lg flex items-center justify-between">
            <span className="font-medium text-gray-800">
              Terms & Conditions
            </span>
            <span className="text-gray-400">→</span>
          </button>
        </div>

        {/* Logout */}
        <Button
          variant="destructive"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Logout
        </Button>
      </div>
    </Layout>
  );
}
