import React, { useId, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  isValidEmail,
  containsNumbers,
  isInputEmpty,
} from "../utils/InputValidator.js";
import FormHeader from "../components/FormHeader";

import SocialButton from "../components/SocialButton";
import Input from "../components/Input";
import ShowPassword from "../assets/show.svg";
import FacebookLogo from "../assets/facebook.svg";
import GithubLogo from "../assets/github.svg";
import GoogleLogo from "../assets/google.svg";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputError, setInputError] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const emailId = useId();
  const passwordId = useId();

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  useEffect(() => {
    if (filled < 100 && isRunning) {
      setTimeout(() => {
        setFilled((prev) => (prev += 20));
      }, 50);
    }
  }, [filled, isRunning, timeoutId]);

  const handleProgressBar = (e) => {
    e.preventDefault();

    setTimeout(() => {
      navigate("/signup");
    }, 1500);

    setClicked(true);
    setIsRunning(true);
  };

  const handleSubmitProgressBar = (location) => {
    setTimeout(() => {
      navigate(location);
    }, 1500);

    setClicked(true);
    setIsRunning(true);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });

    if (!isValidEmail(value)) {
      setInputError({ ...inputError, email: "Email is invalid" });
    } else {
      setInputError({ ...inputError, email: "" });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });

    if (value.trim().length < 8) {
      setInputError({
        ...inputError,
        password: "Password should be greater than 8 characters.",
      });
    } else if (!containsNumbers(value)) {
      setInputError({
        ...inputError,
        password: "Password should contain numbers.",
      });
    } else {
      setInputError({ ...inputError, password: "" });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setTimeoutId(
      setTimeout(() => {
        setShowPassword(false);
      }, 3000)
    );

    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let verified = true;

    //if  email and password is empty
    if (isInputEmpty(user.email) && isInputEmpty(user.password)) {
      setInputError({ email: "Email is empty", password: "Password is empty" });
      verified = false;
    } else if (isInputEmpty(user.email)) {
      setInputError({ ...inputError, email: "Email is empty" });
      verified = false;
    } else if (isInputEmpty(user.password)) {
      setInputError({ ...inputError, password: "Password is empty" });
      verified = false;
    }

    if (
      inputError.email.trim() === "" &&
      inputError.password.trim() === "" &&
      verified
    ) {
      handleSubmitProgressBar("/home");
    }
  };

  return (
    <div className="bg-background flex justify-center  h-screen">
      <form method="post">
        <div className="main w-[23rem] font-poppins sm:w-[30rem]  md:mt-5">
          {/* HEADER */}
          <FormHeader text={"Sign in to  your account"} />

          {/* Login Form */}
          <div className="login-form bg-white drop-shadow-md p-6 space-y-5 rounded-md relative md:p-10">
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

            {/* Input Field  Email*/}

            <Input
              type={"email"}
              name={"email"}
              state={user.email}
              handleFunction={handleEmailChange}
              id={emailId}
              labelName={"Email address"}
              inputError={inputError.email}
            />

            {/* Input Field  Password*/}
            <div className="flex flex-col space-y-1">
              <label htmlFor={passwordId}>Password</label>

              <div className="input-parent relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  name={"password"}
                  state={user.password}
                  handleFunction={handlePasswordChange}
                  id={passwordId}
                />

                {/* Show password button */}
                <button
                  className="absolute  right-2 top-2"
                  onClick={handleClick}
                >
                  <img src={ShowPassword} alt="" className="w-6" />
                </button>
              </div>

              <p className="text-red-700">{inputError.password}</p>
            </div>

            <div className="flex justify-between	">
              <p>
                <input
                  type="checkbox"
                  className="cursor-pointer accent-primary"
                />{" "}
                <span className="ml-1 text-sm sm:text-base">Remember me</span>
              </p>

              <a
                href="#"
                className="text-primary font-semibold text-sm sm:text-base"
              >
                Forgot your password?
              </a>
            </div>

            <div>
              <button
                className="bg-primary w-full text-white py-2 rounded-md text-lg hover:drop-shadow-sm"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>

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

            <div className="text-center">
              <button
                onClick={handleProgressBar}
                className="signup text-gray-400 hover:text-primary"
              >
                Don't have an account? Sign up here
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
