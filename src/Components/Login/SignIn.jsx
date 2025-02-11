import loginImg from "@/assets/Login/login_img.svg";
import Typography from "../Typography";
import SignInForm from "./SignInForm";

const SignIn = () => {
  return (
    <div className=" pt-20 md:pt-24 ">
      <div className=" px-5 md:px-10 max-w-screen-max_screen mx-auto ">
        <div className="py-24 grid lg:grid-cols-2 grid-cols-1 gap-10 items-center">
          <div>
            <div className="mx-auto lg:mx-0 w-fit lg:w-full">
              <Typography.Heading2 variant="semibold" className="text-black">
                {" "}
                Hey, <span className="text-secondary">Welcome Back!</span>
              </Typography.Heading2>
              <Typography.Body
                className="text-black/70 max-w-xs text-center lg:text-left"
                variant="normal"
              >
                Explore the courses? Login below to get started.
              </Typography.Body>
            </div>
            <img className="mt-28 hidden lg:block" src={loginImg} alt="img" />
          </div>

          <div>
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
