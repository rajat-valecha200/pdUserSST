import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
}: LoginModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // Handle resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendCode = () => {
    if (email.trim()) {
      setStep(2);
      setResendTimer(60);
    }
  };

  const handleVerify = () => {
    if (code === "123456") {
      // Mock verification - any 6 digit code works
      onLogin(email);
      onClose();
      setStep(1);
      setEmail("");
      setCode("");
    } else {
      alert("Invalid code");
    }
  };

  const handleResend = () => {
    setResendTimer(60);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-xl flex">
        {/* Left Side - Gradient Background */}
        <div className="hidden md:flex md:w-1/3 bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-400 p-8 flex-col justify-center items-center text-white">
          <div className="text-sm font-semibold mb-8">pockydoc</div>
          <h2 className="text-3xl font-bold leading-tight text-center">
            Your first step to better care starts here.
          </h2>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-2/3 p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>

          {step === 1 ? (
            // Step 1: Enter Email/Phone
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Step 1</h3>
                <p className="text-gray-600 mt-2">Get Started</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone no. or Email address*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter phone no. or email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Enter your phone no. or email address and we'll send a
                    verification code.
                  </p>
                </div>

                <Button
                  onClick={handleSendCode}
                  disabled={!email.trim()}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg"
                >
                  Send code
                </Button>
              </div>
            </div>
          ) : (
            // Step 2: Enter Verification Code
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Step 1</h3>
                <p className="text-gray-600 mt-2">Get Started</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification code*
                  </label>
                  <input
                    type="text"
                    placeholder="• • • • • •"
                    value={code}
                    onChange={(e) => setCode(e.target.value.slice(0, 6))}
                    maxLength={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent tracking-widest"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    We've sent a 6-digit code. Please enter it below to verify
                    your account.
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Didn't get the code?</span>
                  {resendTimer > 0 ? (
                    <span className="text-gray-500">
                      Resend code in 00:
                      {resendTimer.toString().padStart(2, "0")} seconds
                    </span>
                  ) : (
                    <button
                      onClick={handleResend}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Resend code
                    </button>
                  )}
                </div>

                <Button
                  onClick={handleVerify}
                  disabled={code.length !== 6}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Test Code Hint */}
          <p className="text-xs text-gray-400 mt-8 text-center">
            Test: Use code 123456
          </p>
        </div>
      </div>
    </div>
  );
}
