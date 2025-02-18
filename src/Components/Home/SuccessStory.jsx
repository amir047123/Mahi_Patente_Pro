import Typography from "@/Components/Typography";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import demoImg from "@/assets/Home/SuccessStudents/demo-user.svg";

const SuccessStory = () => {
  return (
    <div className="max-w-screen-max_screen mx-auto xl:px-0 lg:px-8 md:px-6 px-4  mb-24">
      {/* Header Section */}
      <div className="text-center mb-12">
        <Typography.Heading2 className="">
          Success Stories from{" "}
          <span className="bg-gradient text-transparent bg-clip-text w-fit">
            Our Students
          </span>
        </Typography.Heading2>
        <Typography.Body className="text-gray-600 mt-2">
          Thousands of learners have passed the Italian driving test with our
          help. See what they say!
        </Typography.Body>
      </div>

      <div className="">
        <Carousel>
          <CarouselContent className="space-x-5 px-10">
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 bg-[#FEFCCE] px-5 py-8 rounded-lg shadow-sm">
              <img
                className="mx-auto rounded-full w-20 "
                src={demoImg}
                alt=""
              />
              <Typography.Body className="my-5 text-[#333333]">
                “Lobortis leo pretium facilisis amet nisl at nec. Scelerisque
                risus tortor donec ipsum consequat semper consequat adipiscing
                ultrices.”
              </Typography.Body>

              <h2 className="text-lg font-semibold text-right">
                James Pattinson
              </h2>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 bg-[#D6EFFE] px-5 py-8 rounded-lg shadow-sm">
              <img
                className="mx-auto rounded-full w-20 "
                src={demoImg}
                alt=""
              />
              <Typography.Body className="my-5 text-[#333333]">
                “Lobortis leo pretium facilisis amet nisl at nec. Scelerisque
                risus tortor donec ipsum consequat semper consequat adipiscing
                ultrices.”
              </Typography.Body>

              <h2 className="text-lg font-semibold text-right">
                James Pattinson
              </h2>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3 bg-[#FEE4DA] px-5 py-8 rounded-lg shadow-sm">
              <img
                className="mx-auto rounded-full w-20 "
                src={demoImg}
                alt=""
              />
              <Typography.Body className="my-5 text-[#333333]">
                “Lobortis leo pretium facilisis amet nisl at nec. Scelerisque
                risus tortor donec ipsum consequat semper consequat adipiscing
                ultrices.”
              </Typography.Body>

              <h2 className="text-lg font-semibold text-right">
                James Pattinson
              </h2>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default SuccessStory;
