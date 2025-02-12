import { useState } from "react";
import { Link } from "react-router-dom";
// import CustomIcon from "../../../Components/Ui/CustomIcon";
import { BsPerson } from "react-icons/bs";
import Typography from "../Typography";
import { CiKeyboard, CiLock } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      className="  rounded-3xl px-8 pt-8 pb-5 gradient-border p-10 bg-white max-w-xl mx-auto border"
      onSubmit={handleSubmit}
    >
      <div className="w-fit mx-auto pb-8 font-font-pop">
        <Typography.Heading3
          className="text-black text-center"
          variant="semibold"
        >
          Create an account
        </Typography.Heading3>
      </div>

      {!otpSent ? (
        <div className="space-y-4 mb-6 ">
          <div>
            <label className="text-black mb-2 block text-lg">Full name</label>
            <div className="relative">
              <input
                className="w-full bg-primary/5 outline-none border border-gray-300 px-5 py-3  sm:text-[16px] rounded-full pl-10 text-black"
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
              />
              <BsPerson className="pointer-events-none absolute inset-y-0 start-1 top-3.5 grid w-10 place-content-center text-2xl text-gray-400" />
            </div>
          </div>
          <div>
            <label className="text-black mb-2 block text-lg">
              Email address
            </label>
            <div className="relative">
              <input
                className="w-full bg-primary/5 outline-none border border-gray-300 px-5 py-3  sm:text-[16px] rounded-full pl-10 text-black"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
              />
              <MdOutlineAlternateEmail className="pointer-events-none absolute inset-y-0 start-1 top-3.5 grid w-10 place-content-center text-2xl text-gray-400" />
            </div>
          </div>
          <div>
            <label className="text-black mb-2 block text-lg">
              Enter mobile number
            </label>
            <div className="relative">
              <input
                className="w-full bg-primary/5 outline-none border border-gray-300 px-5 py-3  sm:text-[16px] rounded-full pl-10 text-black"
                id="phone"
                name="phone"
                type="number"
                placeholder="Enter your mobile number"
              />
              <IoMdPhonePortrait className="pointer-events-none absolute inset-y-0 start-1 top-3.5 grid w-10 place-content-center text-2xl text-gray-400" />
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
          <div>
            <label className="text-black mb-2 block text-lg">
              {" "}
              Confirm password{" "}
            </label>
            <div className="relative">
              <input
                className="w-full  bg-primary/5 outline-none border border-gray-300 px-5 py-3  sm:text-[16px] rounded-full pl-10 text-black"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            {!isLoading && !otpSent && "Sign Up"}
          </span>
          {/* group-hover:top-0 group-hover:-right-9 */}
        </button>

        <Typography.Body variant="normal" className="text-black/70 text-center">
          Already have an account?{" "}
        </Typography.Body>
        <Link
          to="/login"
          className="text-secondary text-center block font-semibold"
        >
          Login here
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

export default SignUpForm;
