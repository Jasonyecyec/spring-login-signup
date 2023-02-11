import React, { useId, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "../components/FormHeader";
import Input from "../components/Input";

// import ShowPassword from "../assets/show.svg";
import SocialButton from "../components/SocialButton";
import FacebookLogo from "../assets/facebook.svg";
import GithubLogo from "../assets/github.svg";
import GoogleLogo from "../assets/google.svg";

const Signup = () => {
  const [clicked, setClicked] = useState(false);
  const [filled, setFilled] = useState(0);

  const id = useId();

  return (
    <div className="bg-red-300 flex justify-center items-center h-fit">
      <form method="post">
        <div className="main w-[24rem] mb-28 font-poppins sm:w-[30rem] md:mb-36 ">
          {/* HEADER */}
          <FormHeader text={"Create an account"} />

          {/* Sign up form */}
          <div className="signup-form bg-white drop-shadow-md p-10 space-y-5 rounded-md relative">
            {/* Progress bar */}
            <div className={`${clicked ? "" : "hidden"}`}>
              <div className="absolute top-0 left-0  w-full border-2 rounded-md">
                <div
                  style={{
                    width: `${filled}%`,
                    backgroundColor: "#4f46e5",
                    transition: "ease-in-out 0.5s",
                    height: "5px",
                  }}
                ></div>
              </div>
            </div>

            {/* Input field first name*/}
            <Input
              type={"text"}
              name={"first-name"}
              // state={user.email}
              // handleFunction={handleEmailChange}
              id={id + "first-name"}
              labelName={"First name"}
              // inputError={inputError.email}
            />

            {/* Input field last name*/}
            <Input
              type={"text"}
              name={"last-name"}
              // state={user.email}
              // handleFunction={handleEmailChange}
              id={id + "last-name"}
              labelName={"Last name"}
              // inputError={inputError.email}
            />

            {/* Input field email*/}
            <Input
              type={"email"}
              name={"email"}
              // state={user.email}
              // handleFunction={handleEmailChange}
              id={id + "email"}
              labelName={"Email"}
              // inputError={inputError.email}
            />

            {/* Input field email*/}
            <Input
              type={"password"}
              name={"password"}
              // state={user.email}
              // handleFunction={handleEmailChange}
              id={id + "password"}
              labelName={"Password"}
              // inputError={inputError.email}
            />

            {/* Input field email*/}
            <Input
              type={"email"}
              name={"email"}
              // state={user.email}
              // handleFunction={handleEmailChange}
              id={id + "email"}
              labelName={"Email"}
              // inputError={inputError.email}
            />

            <div className=" grid grid-cols-3	">
              <div className="border-b-2 border-gray-300 self-start h-3/6"></div>

              <div className="p-1 text-center ">
                <p className="text-gray-500 text-sm sm:text-base">
                  Or continue with
                </p>
              </div>

              <div className="border-b-2 border-gray-300 h-3/6 "></div>
            </div>

            <div className="flex justify-between ">
              <SocialButton props={FacebookLogo} />
              <SocialButton props={GoogleLogo} />
              <SocialButton props={GithubLogo} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
