import React, { useId, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  isValidEmail,
  containsNumbers,
  isEmpty,
  ifSame,
} from "../utils/InputValidator.js";
import FormHeader from "../components/FormHeader";
import Input from "../components/Input";

// import ShowPassword from "../assets/show.svg";
import SocialButton from "../components/SocialButton";
import FacebookLogo from "../assets/facebook.svg";
import GithubLogo from "../assets/github.svg";
import GoogleLogo from "../assets/google.svg";

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputError, setInputError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [clicked, setClicked] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [filled, setFilled] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();

  const id = useId();

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
      navigate("/login");
    }, 1000);

    setClicked(true);
    setIsRunning(true);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
    setInputError({ ...inputError, [e.target.name]: "" });
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

    const copied = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (value.trim() !== user.confirmPassword) {
      // setInputError({ ...inputError, confirmPassword: "" });
      copied.confirmPassword = "Password not the same.";
    }

    if (!containsNumbers(value)) {
      copied.password = "Password should contain numbers.";
    }
    if (value.trim().length < 8) {
      copied.password = "Password should be greater than 8 characters.";
    }

    setInputError(copied);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });

    if (value.trim() !== user.password) {
      setInputError({
        ...inputError,
        confirmPassword: "Password not the same.",
      });
    } else {
      setInputError({ ...inputError, confirmPassword: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const copied = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let verified = true;

    if (isEmpty(user.firstName)) {
      copied.firstName = "First name is empty";
      verified = false;
    }

    if (isEmpty(user.lastName)) {
      copied.lastName = "Last name is empty";
      verified = false;
    }

    if (isEmpty(user.email)) {
      copied.email = "Email name is empty";
      verified = false;
    }

    if (isEmpty(user.password)) {
      copied.password = "Password  is empty";
      verified = false;
    }

    if (isEmpty(user.confirmPassword)) {
      copied.confirmPassword = "Confirm password is empty";
      verified = false;
    }

    if (isEmpty(user.confirmPassword)) {
      copied.confirmPassword = "Confirm password is empty";
      verified = false;
    }

    if (!ifSame(user.password, user.confirmPassword)) {
      copied.confirmPassword = "Password not the same";
      verified = false;
    }

    if (isEmpty(user)) {
      setInputError({
        firstName: "First name is empty",
        lastName: "Last name is empty",
        email: "Email is empty",
        password: "Password is empty",
        confirmPassword: "Confirm password is empty",
      });

      verified = false;
      return;
    }

    setInputError(copied);

    if (
      isEmpty(inputError) &&
      verified &&
      ifSame(user.password, user.confirmPassword)
    ) {
      handleSubmitProgressBar("/home");
    }
  };

  return (
    <div className="bg-background flex justify-center h-full ">
      <form method="post">
        <div className="main w-[23rem]  font-poppins sm:w-[30rem] ">
          {/* HEADER */}
          <FormHeader text={"Create an account"} />

          {/* Sign up form */}
          <div className="signup-form bg-white drop-shadow-md p-6 space-y-5 rounded-md relative  md:p-10">
            {/* Progress bar */}
            <div className={`${clicked ? "" : "hidden"}`}>
              <div className="absolute top-0 left-0  w-full  rounded-md">
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

            <div className="grid-cols-2 grid gap-x-3">
              {/* Input field first name*/}
              <Input
                type={"text"}
                name={"firstName"}
                state={user.firstName}
                handleFunction={handleNameChange}
                id={id + "firstName"}
                labelName={"First name"}
                inputError={inputError.firstName}
              />

              {/* Input field last name*/}
              <Input
                type={"text"}
                name={"lastName"}
                state={user.lastName}
                handleFunction={handleNameChange}
                id={id + "lastName"}
                labelName={"Last name"}
                inputError={inputError.lastName}
              />
            </div>

            {/* Input field email*/}
            <Input
              type={"email"}
              name={"email"}
              state={user.email}
              handleFunction={handleEmailChange}
              id={id + "email"}
              labelName={"Email"}
              inputError={inputError.email}
            />

            {/* Input field password */}
            <Input
              type={"password"}
              name={"password"}
              state={user.password}
              handleFunction={handlePasswordChange}
              id={id + "password"}
              labelName={"Password"}
              inputError={inputError.password}
            />

            {/* Input field confirm password*/}
            {/* Input Field  Password*/}
            <div className="flex flex-col space-y-1">
              <label htmlFor={id + "confirmPassword"}>Confirm password</label>

              <div className="input-parent relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  name={"confirmPassword"}
                  state={user.confirmPassword}
                  handleFunction={handleConfirmPasswordChange}
                  id={id + "confirmPassword"}
                />

                {/* Show password button */}
                {/* <button
                  className="absolute  right-2 top-3"
                  onClick={handleClick}
                >
                  <img src={ShowPassword} alt="" className="w-6" />
                </button> */}
              </div>

              <p className="text-red-700">{inputError.confirmPassword}</p>
            </div>

            <div>
              <button
                className="bg-primary w-full text-white py-2 rounded-md text-lg hover:drop-shadow-sm"
                onClick={handleSubmit}
              >
                Create Account
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
                Already have an account? Log In here
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
