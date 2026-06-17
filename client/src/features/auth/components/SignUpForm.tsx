import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";
import { signUpMailOtpSendService } from "../services/signup.service";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Customer",
  });

  const navigate = useNavigate();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password.length < 6) {
      toast.error("Password must be minimum 6 Char");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("confirm password is not equals to password ");
      return;
    }

    const toastId = toast.loading("Sending mail...");
    try {
      const response = await signUpMailOtpSendService(formData);
      console.log(response);

      toast.dismiss(toastId);
      toast.success("please make sure to check spam mails also");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("somthing went worng during sign up send otp mail call ");
    } finally {
      navigate("/verify-otp", { state: formData });
      setLoading(false);
    }
  };
  return (
    <div className="w-full md:w-[45%] bg-white p-8 flex flex-col justify-center shadow-2xl border border-gray-100 rounded-none">
      <div className="mb-6">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#111827",
            letterSpacing: "-0.5px",
          }}
        >
          Sign Up
        </Typography>
        <p className="text-gray-500 mt-1 text-sm">
          Fill the form to create the Account for Home Genie
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          variant="outlined"
          size="small"
          value={formData.fullName}
          onChange={handleChange}
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 0,
            },
          }}
        />

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
                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth size="small">
          <InputLabel>Confirm Password</InputLabel>

          <OutlinedInput
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            label="Confirm Password"
            sx={{ borderRadius: 0 }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth size="small" required>
          <InputLabel id="role-label" style={{ borderRadius: 0 }}>
            Select Role
          </InputLabel>
          <Select
            labelId="role-label"
            id="role"
            name="role"
            value={formData.role}
            label="Select Role"
            onChange={handleChange}
            style={{ borderRadius: 0 }}
          >
            <MenuItem value="Customer">Customer</MenuItem>
            <MenuItem value=" Service Provider">Service Provider</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            bgcolor: "#111827",
            "&:hover": {
              bgcolor: "#374151",
            },
            py: 1.5,
            fontWeight: 600,
            boxShadow: "none",
            borderRadius: 0, // Removed border radius
          }}
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="font-medium text-gray-900 hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
};

export default SignUpForm;
