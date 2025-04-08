import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import CustomIcon from "../../../Components/Ui/CustomIcon";
import { BsPerson } from "react-icons/bs";
import Typography from "@/Components/Typography";
import { CiKeyboard, CiLock } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { baseURL } from "@/Config";
import { useAuthContext } from "@/Context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";

const SignUpForm = () => {
  const {
    login,
    createUser,
    otpSent,
    setOtpSent,
    user,
    error,
    setError: setAuthError,
    loading,
  } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [showResendOtp, setShowResendOtp] = useState(false);
  const [apiError, setAPIError] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);

  const methods = useForm();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
  } = methods;

  const onSubmit = async (data) => {
    if (otpSent) {
      if (data?.otp?.length !== 6) {
        setError("otp", {
          type: "manual",
          message: "OTP Must Be At least 6 Digits",
        });

        return;
      }

      const formData = {
        userData: {
          auth: {
            email: data?.email,
            phone: data?.phone,
            password: data?.password,
          },
          profile: {
            name: data?.fullName,
          },
        },
        otp: data?.otp,
      };
      try {
        setIsLoading(true);
        await createUser(formData);
      } catch (error) {
        setAPIError(error?.message);
        setAuthError(error?.message);
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (data?.password?.length < 6 || data?.confirmPassword?.length < 6) {
        setError("password", {
          type: "manual",
          message: "Passwords must be at least 6 characters",
        });
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords must be at least 6 characters",
        });
        return;
      }

      if (data?.password !== data?.confirmPassword) {
        setError("password", {
          type: "manual",
          message: "Passwords do not match",
        });
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }

      try {
        setIsLoading(true);

        const response = await fetch(`${baseURL}/user/send-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data?.email,
            phone: data?.phone,
          }),
        });

        const responseData = await response.json();

        if (response.ok) {
          toast.success(responseData?.message);
          setEmail(data?.email);
          setPassword(data?.password);
          setOtpSent(true);
          setAPIError("");
          setAuthError("");
        } else {
          throw new Error(responseData?.message);
        }
      } catch (error) {
        setAPIError(error?.message);
        setAuthError(error?.message);
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const showError = (name) => {
    const errorMsg = errors[name]?.message;
    return <p className="text-red-500 text-sm mt-1">{errorMsg}</p>;
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user?.profile?.role === "admin") {
      navigate("/admin-dashboard", { replace: true });
    } else if (user && user?.profile?.role === "user") {
      navigate("/user-dashboard", { replace: true });
    } else {
      navigate("/sign-up", { replace: true });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    let timer;
    const startCountdown = () => {
      setShowResendOtp(false);
      setCountdown(300);

      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setShowResendOtp(true);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    };

    if (otpSent) {
      startCountdown();
    }

    return () => {
      clearInterval(timer);
    };
  }, [otpSent, otpLoading]);

  const handleResendOtp = async () => {
    setIsLoading(true);
    setOtpLoading(true);
    setValue("otp", "");

    try {
      await login(email, password);
    } catch (error) {
      toast.error(error?.message || "Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
      setOtpLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    return () => {
      setOtpSent(false);
    };
  }, [setOtpSent]);

  return (
    <form
      className="rounded-3xl px-8 pt-8 pb-5 gradient-border p-10 bg-white max-w-xl mx-auto border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-fit mx-auto pb-8 font-font-pop">
        <Typography.Heading3
          className="text-black text-center"
          variant="semibold"
        >
          {otpSent ? "Verify your account" : "Create an account"}
        </Typography.Heading3>
      </div>

      {!otpSent ? (
        <div className="space-y-4 mb-6 ">
          <div>
            <label className="text-black mb-2 block text-lg">Full name</label>
            <div className="relative">
              <input
                {...register("fullName", { required: "Full name is required" })}
                className="w-full bg-primary/5 outline-none border border-gray-300 px-5 py-3  sm:text-[16px] rounded-full pl-10 text-black"
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
              />
              <BsPerson className="pointer-events-none absolute inset-y-0 start-1 top-3.5 grid w-10 place-content-center text-2xl text-gray-400" />
            </div>
            {showError("fullName")}
          </div>

          <div>
            <label className="text-black mb-2 block text-lg">
              Email address
            </label>
            <div className="relative">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full bg-primary/5 outline-none border border-gray-300 px-5 py-3  sm:text-[16px] rounded-full pl-10 text-black"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
              />
              <MdOutlineAlternateEmail className="pointer-events-none absolute inset-y-0 start-1 top-3.5 grid w-10 place-content-center text-2xl text-gray-400" />
            </div>
            {showError("email")}
          </div>

          <div>
            <label className="text-black mb-2 block text-lg">
              Enter mobile number
            </label>
            <div className="relative">
              <input
                {...register("phone", { required: "Phone is required" })}
                className="w-full bg-primary/5 outline-none border border-gray-300 px-5 py-3  sm:text-[16px] rounded-full pl-10 text-black"
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter your mobile number"
              />
              <IoMdPhonePortrait className="pointer-events-none absolute inset-y-0 start-1 top-3.5 grid w-10 place-content-center text-2xl text-gray-400" />
            </div>
            {showError("phone")}
          </div>

          <div>
            <label className="text-black mb-2 block text-lg"> Password </label>
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                className="w-full  bg-primary/5 outline-none border border-gray-300 px-5 py-3  sm:text-[16px] rounded-full pl-10 text-black"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <CiLock className="text-secondaryText/60 text-2xl" />
              </div>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <IoEyeOffOutline className="text-secondaryText/60 text-2xl" />
                ) : (
                  <IoEyeOutline className="text-secondaryText/60 text-2xl" />
                )}
              </button>
            </div>
            {showError("password")}
          </div>

          <div>
            <label className="text-black mb-2 block text-lg">
              {" "}
              Confirm password{" "}
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                className="w-full  bg-primary/5 outline-none border border-gray-300 px-5 py-3  sm:text-[16px] rounded-full pl-10 text-black"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <CiLock className="text-secondaryText/60 text-2xl" />
              </div>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <IoEyeOffOutline className="text-secondaryText/60 text-2xl" />
                ) : (
                  <IoEyeOutline className="text-secondaryText/60 text-2xl" />
                )}
              </button>
            </div>
            {showError("confirmPassword")}
          </div>
        </div>
      ) : (
        <>
          <div>
            <label className="text-black mb-2 block text-lg">Enter OTP</label>
            <span className="text-[#666] mb-4 mt-2  block text-sm">
              The 6 Digit OTP code send on your email
            </span>
            <div className="relative">
              <input
                {...register("otp", {
                  required: otpSent && "OTP is required",
                })}
                className="w-full  bg-primary/5 outline-none border border-gray-300 px-5 py-3.5  sm:text-[16px] rounded-full pl-10 text-black"
                id="otp"
                type="text"
                maxLength={6}
                placeholder="Enter OTP"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <CiKeyboard className="text-secondaryText/60 text-2xl" />
              </div>
            </div>
          </div>

          <div className="ms-4">{showError("otp")}</div>

          <span className="text-[#666] my-4 block text-sm text-right">
            Wrong email?{" "}
            <button
              onClick={() => {
                setOtpSent(false);
                setAPIError("");
                setAuthError("");
                setValue("otp", "");
              }}
              className="appearance-none text-secondary hover:underline"
              type="button"
            >
              Change your email
            </button>
          </span>
        </>
      )}
      <div className="mt-6 mb-6">
        <button
          className="flex items-center justify-center gap-2 mt-4 mb-3 group w-full"
          type="submit"
        >
          <span
            className={`bg-secondary text-white  ${
              isLoading
                ? "cursor-not-allowed bg-secondary/70"
                : "hover:bg-secondary/70"
            } px-10 py-3 rounded-full font-medium w-full flex items-center justify-center transition-all duration-300`}
          >
            {isLoading && <Spinner size={24} className="text-white" />}
            {!isLoading && otpSent && "Verify OTP"}
            {!isLoading && !otpSent && "Sign Up"}
          </span>
          {/* group-hover:top-0 group-hover:-right-9 */}
        </button>

        {(apiError || error) && (
          <p className="text-red-500 text-center mt-4 font-semibold">
            {apiError || error}
          </p>
        )}

        {otpSent && (
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Expired OTP in:{" "}
              {countdown > 0 ? formatTime(countdown) : "Expired"}
            </p>
            {showResendOtp && (
              <button
                type="button"
                className="text-primary hover:text-secondary mt-4 font-semibold transition-all duration-300"
                onClick={handleResendOtp}
                disabled={isLoading}
              >
                Resend OTP
              </button>
            )}
          </div>
        )}

        <Typography.Body
          variant="normal"
          className="text-black/70 text-center mt-7"
        >
          Already have an account?{" "}
        </Typography.Body>
        <Link
          to="/login"
          className="text-secondary text-center block font-semibold"
        >
          Login here
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
