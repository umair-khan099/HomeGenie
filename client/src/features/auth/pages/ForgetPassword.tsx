import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  forgetPasswordGetOptService,
  forgetPasswordService,
} from "../services/forgetPassword.service";

import { forgetPasswordVerifyOtp } from "../../../api/auth";
const ForgetPassword = () => {
  // navigator
  const navigate = useNavigate();
  // steps
  const [steps, setSteps] = useState(0);
  // email
  const [email, setEmail] = useState("");
  //otp
  const [otp, setOtp] = useState("");

  // token
  const [token, settoken] = useState("");
  //password
  const [password, setPassword] = useState("");

  //confirm password
  const [confirmPassword, setConfirmPassword] = useState("");

  // hide and show password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // handle email subbmiton

  const handleEmailSubmit = async () => {
    const toastId = toast.loading("Verifying Email...");
    try {
      const response = await forgetPasswordGetOptService(email);
      toast.dismiss(toastId);
      toast.success(response.data.message);
      setSteps((prev) => prev + 1);
    } catch (error) {
      toast.dismiss(toastId);
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("somthing went wrong at verify email");
      }
    }
  };
  //handle verify otp
  const handleVerifyOtpSubmit = async () => {
    const toastId = toast.loading("Verifying Otp  ...");
    try {
      const response = await forgetPasswordVerifyOtp(email, otp);
      toast.dismiss(toastId);
      toast.success(response.data.message);
      settoken(response?.data?.data?.result?.resetToken);
      console.log(token);
      console.log(response);
      setSteps((prev) => prev + 1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("something went wrong at verify otp");
      }
    }
  };
  //handle reset Password
  const handleResetPasswordSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const toastId = toast.loading("Reset Password...");
    try {
      const response = await forgetPasswordService({
        token,
        password,
        confirmPassword,
      });
      toast.dismiss(toastId);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.dismiss(toastId);
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("somthing went wrong at reset PAssword");
      }
    }
  };
  // useEffect(() => {
  //   console.log("steps =", steps);
  // }, [steps]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl md:h-[75vh] flex flex-col md:flex-row items-center gap-8">
        {/* Left Side */}
        <div className="w-full md:w-[45%] bg-white p-8 flex flex-col justify-center shadow-2xl border border-gray-100 rounded-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={steps}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {steps === 0 && (
                <>
                  <div className="mb-6">
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "#111827",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      Forgot Password
                    </Typography>

                    <p className="text-gray-500 mt-1 text-sm">
                      Enter your registered email address to receive an OTP.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <TextField
                      fullWidth
                      label="Email Address"
                      size="small"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 0,
                        },
                      }}
                    />

                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleEmailSubmit}
                      sx={{
                        mt: 2,
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
                      SEND OTP
                    </Button>
                  </div>
                </>
              )}
              {steps === 1 && (
                <>
                  <div className="mb-6">
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

                    <p className="text-gray-500 mt-1 text-sm">
                      Enter the OTP sent to your email.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <TextField
                      fullWidth
                      label="Enter OTP"
                      size="small"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 0,
                        },
                      }}
                    />

                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleVerifyOtpSubmit}
                      sx={{
                        mt: 2,
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
                      VERIFY OTP
                    </Button>
                  </div>
                </>
              )}

              {steps === 2 && (
                <>
                  <div className="mb-6">
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: "#111827",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      Reset Password
                    </Typography>

                    <p className="text-gray-500 mt-1 text-sm">
                      Create a new password for your account.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <FormControl fullWidth size="small">
                      <InputLabel>New Password</InputLabel>

                      <OutlinedInput
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="New Password"
                        sx={{ borderRadius: 0 }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <FormControl fullWidth size="small">
                      <InputLabel>Confirm Password</InputLabel>

                      <OutlinedInput
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        label="Confirm Password"
                        sx={{ borderRadius: 0 }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                              }
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>

                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleResetPasswordSubmit}
                      sx={{
                        mt: 2,
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
                      RESET PASSWORD
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side */}
        <div className="hidden md:block md:w-[55%] h-full">
          {/* Animation ke liye khaali */}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
