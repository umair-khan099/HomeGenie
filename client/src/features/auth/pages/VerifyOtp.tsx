import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import OtpInput from "react-otp-input";
import LogoAnimation from "../components/LogoAnimation";
import toast from "react-hot-toast";
import {
  signUpMailOtpSendService,
  signUpService,
} from "../services/signup.service";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../store/auth.slice";
import type { signUpPayload } from "../../../types/auth.type";

const VerifyOtp = () => {
  // store data in variable
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //  fetch data from signUp component
  const location = useLocation();
  const data: signUpPayload = {
    ...((location.state as Omit<signUpPayload, "otp">) || {}),
    otp,
  } as signUpPayload;

  const handleVerifyOtp = async () => {
    const toastId = toast.loading("verifying otp");
    try {
      setLoading(true);
      const response = await signUpService(data);
      dispatch(setToken(response.data?.user?.accessToken));
      toast.dismiss(toastId);
      toast.success(response?.data?.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.dismiss(toastId);

      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("somthing went worng");
      }
    }
  };

  const handleResendOtp = async () => {
    console.log("Resend OTP");
    try {
      const response = await signUpMailOtpSendService(data);
      console.log(response);
      toast.success("please make sure to check spam mails also");
    } catch (error) {
      console.error(error);
      toast.error("somthing went worng during sign up send otp mail call ");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl md:h-[75vh] flex flex-col md:flex-row items-center gap-8">
        {/* Left Side */}
        <div className="w-full md:w-[45%] bg-white p-8 flex flex-col justify-center shadow-2xl border border-gray-100 rounded-none">
          <div className="mb-8">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#111827",
                letterSpacing: "-0.5px",
              }}
            >
              Verify OTP
            </Typography>

            <p className="text-gray-500 mt-2 text-sm">
              HomeGenie has sent a 4-digit verification code to your email
              address.
            </p>

            <p className="text-gray-500 mt-1 text-sm">
              Please enter the OTP below to verify your email and continue.
            </p>
            <p className="text-blue-600 mt-2 text-sm text-center">
              {data?.email}
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span className="mx-2"></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "55px",
                    height: "55px",
                    margin: "0 5px",
                    fontSize: "20px",
                    borderRadius: "0",
                    border: "1px solid #d1d5db",
                    outline: "none",
                    textAlign: "center",
                    color: "#111827",
                  }}
                />
              )}
            />
          </div>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleVerifyOtp}
            disabled={loading}
            sx={{
              bgcolor: "#111827",
              "&:hover": {
                bgcolor: "#374151",
              },
              py: 1.5,
              fontWeight: 600,
              boxShadow: "none",
              borderRadius: 0,
            }}
          >
            {loading ? "loadng" : "Verify Otp"}
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Didn't receive the OTP?</p>

            <button
              onClick={handleResendOtp}
              className="mt-2 text-sm font-medium text-gray-900 hover:underline"
            >
              Resend OTP
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:block md:w-[55%] h-full">
          <LogoAnimation />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
