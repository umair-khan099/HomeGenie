import React from "react";
import SignUpForm from "../components/SignUpForm";
import LogoAnimation from "../components/LogoAnimation";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Container holding both Form and Animation section */}
      <div className="w-full max-w-5xl md:h-[75vh] flex flex-col md:flex-row md:items-center gap-8">
        {/* Left Side: Form Section (Decreased width slightly to w-[45%]) */}
        <SignUpForm />

        {/* Right Side: Empty Animation Section (Takes up the other half space) */}
        <LogoAnimation />
      </div>
    </div>
  );
};

export default SignUp;
