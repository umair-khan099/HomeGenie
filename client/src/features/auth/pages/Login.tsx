import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";
import { loginInService } from "../services/login.service";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../store/auth.slice";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // login validation

    setLoading(true);
    const toastId = toast.loading("logIn..");
    try {
      const response = await loginInService(formData);
      console.log(response);
      toast.dismiss(toastId);

      // set Access token to redux store
      dispatch(setToken(response?.data?.user?.accessToken));
      //
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.dismiss(toastId);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("somthing went worng");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Container holding both Form and Animation section */}
      <div className="w-full max-w-5xl md:h-[70vh] flex flex-col md:flex-row items-center gap-8">
        {/* Left Side: Form Section (w-[45%]) */}
        <div className="w-full md:w-[40%] bg-white p-8 flex flex-col justify-center shadow-2xl border border-gray-100 rounded-none">
          <div className="mb-6">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#111827",
                letterSpacing: "-0.5px",
              }}
            >
              Log In
            </Typography>
            <p className="text-gray-500 mt-1 text-sm">
              Welcome back to Home Genie. Please enter your credentials.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Address */}
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              variant="outlined"
              size="small"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                },
              }}
            />
            {/* Password with Eye Icon */}
            <FormControl fullWidth size="small">
              <InputLabel>Password</InputLabel>

              <OutlinedInput
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                label="Password"
                sx={{ borderRadius: 0 }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className="flex justify-end">
              <Link
                to="/reset-password"
                className="text-sm text-gray-500 hover:text-gray-900 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
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
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-gray-900 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Right Side: Empty Animation Section (w-[55%]) */}
        <div className="hidden md:block md:w-[55%] h-full">
          {/* This space is left empty for your animation */}
        </div>
      </div>
    </div>
  );
};

export default Login;
