import React from "react";
import TailwindLogo from "../assets/tailwind.svg";

const FormHeader = ({ text }) => {
  return (
    <div className="text-center space-y-1  p-7 flex flex-col justify-center md:p-10">
      <div className="flex justify-center">
        <img src={TailwindLogo} alt="logo" className="w-12 md:w-16" />
      </div>
      <h1 className="font-bold text-2xl md:text-3xl">{text}</h1>
      <p>
        Or{" "}
        <span className="text-primary font-semibold">
          {" "}
          start your 14-day free trial
        </span>
      </p>
    </div>
  );
};

export default FormHeader;
