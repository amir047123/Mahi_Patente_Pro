import { useState } from "react";
import { Link } from "react-router-dom";
// import CustomIcon from "../../../Components/Ui/CustomIcon";
import { BsPerson } from "react-icons/bs";
import Typography from "@/Components/Typography";
import { CiKeyboard, CiLock } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Checkbox } from "../ui/checkbox";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showResendOtp, setShowResendOtp] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setOtpSent(true);
    setIsLoading(false);
  };

  return (
    <form
      className="  rounded-3xl px-8 pt-8 pb-5 secondary-border p-10 bg-white max-w-xl mx-auto border"
      onSubmit={handleSubmit}
    >
      <div className="w-fit mx-auto pb-8 font-font-pop">
        <Typography.Heading3
          className="text-black text-center"
          variant="semibold"
        >
          Login to your Account
        </Typography.Heading3>
      </div>

      {!otpSent ? (
        <div className="space-y-4 mb-6 ">
          <div>
            <label className="text-black mb-2 block text-lg">
              Enter your mobile number
            </label>
            <div className="relative">
              <input
                className="w-full bg-primary/5 outline-none border border-gray-300 px-5 py-3  sm:text-[16px] rounded-full pl-10 text-black"
                id="number"
                type="number"
                placeholder="Enter Your mobile number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <BsPerson className="pointer-events-none absolute inset-y-0 start-1 top-3.5 grid w-10 place-content-center text-2xl text-gray-400" />
            </div>
          </div>
          <div>
            <label className="text-black mb-2 block text-lg"> Password </label>
            <div className="relative">
              <input
                className="w-full  bg-primary/5 outline-none border border-gray-300 px-5 py-3  sm:text-[16px] rounded-full pl-10 text-black"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <CiLock className="text-secondaryText/60 text-2xl" />
              </div>
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <IoEyeOffOutline className="text-secondaryText/60 text-2xl" />
                ) : (
                  <IoEyeOutline className="text-secondaryText/60 text-2xl" />
                )}
              </div>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center mb-6  ">
            <div className="flex items-center gap-2">
              <Checkbox className=""></Checkbox>
              <span className=""> Remember me</span>
            </div>
            <Link to="/forgotPassword" className="hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            className="w-full  bg-primary/5 outline-none border border-gray-300 px-5 py-3.5  sm:text-[16px] rounded-full pl-10 text-black"
            id="otp"
            type="text"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <CiKeyboard className="text-secondaryText/60 text-2xl" />
          </div>
        </div>
      )}
      <div className="mt-6 mb-6">
        <button
          className="flex items-center gap-2 my-10  group w-full"
          type="submit"
        >
          <span
            className={`bg-secondary text-white  ${
              isLoading ? "cursor-not-allowed" : "hover:bg-secondary/90"
            } px-10 py-3 rounded-full  font-medium w-full`}
          >
            {isLoading && <div>Loading........</div>}
            {!isLoading && otpSent && "Verify OTP"}
            {!isLoading && !otpSent && "Sign In"}
          </span>
          {/* group-hover:top-0 group-hover:-right-9 */}
        </button>

        <Typography.Body variant="normal" className="text-black/70 text-center">
          You don’t have any account yet?{" "}
        </Typography.Body>
        <Link
          to="/sign-up"
          className="text-secondary text-center block font-semibold"
        >
          Create an account
        </Link>
      </div>
      {otpSent && (
        <div className="text-center">
          <p className="text-sm text-gray-500">{otpMessage}</p>
          {showResendOtp && (
            <button
              className="text-primary hover:text-secondary mt-4 font-semibold"
              disabled={isLoading}
            >
              Resend OTP
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default SignInForm;
