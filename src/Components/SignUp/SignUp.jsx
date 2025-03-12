import signUpImg from "@/assets/Login/signUp_img.svg";
import Typography from "@/Components/Typography";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <div className=" pt-20 md:pt-24 ">
      <div className=" px-5 md:px-10 max-w-screen-max_screen mx-auto ">
        <div className="py-24 grid lg:grid-cols-2 grid-cols-1 gap-10 items-center">
          <div>
            <div className="mx-auto lg:mx-0 w-fit lg:w-full">
              <Typography.Heading2 variant="semibold" className="text-black">
                {" "}
                Let’s <span className="text-secondary">Get Started!</span>
              </Typography.Heading2>
              <Typography.Body
                className="text-black/70 max-w-xs text-center lg:text-left"
                variant="normal"
              >
                Join now to access all courses, quizzes, and learning materials.
                Already have an account? Login below!
              </Typography.Body>
            </div>
            <img className="mt-28 hidden lg:block" src={signUpImg} alt="img" />
          </div>

          <div>
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
