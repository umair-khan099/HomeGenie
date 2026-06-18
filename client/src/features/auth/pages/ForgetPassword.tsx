import React, { useState } from "react";

const ForgetPassword = () => {
  // steps
  const [steps, setSteps] = useState(0);
  // email
  const [email, setEmail] = useState("");
  //otp
  const [otp, setOtp] = useState("");

  //password
  const [password, setPassword] = useState("");

  //confirm password
  const [confirmPassword, setConfirmPassword] = useState("");

  // handle email subbmiton

  const handleEmalSubmite = async () => {};
  //handle verify otp
  const handleVerifyOtpSunmite = async () => {};
  //handle reset Password
  const handleResetPasswordSubmite = async () => {};

  
  return (
    <div>
      {/* step 1 show email inputa page  */}
      {/* step 2 shwow verify otp page */}
      {/* step 3 take token pasword , and confirm password */}
    </div>
  );
};

export default ForgetPassword;
