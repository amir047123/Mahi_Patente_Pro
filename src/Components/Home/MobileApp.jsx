
import Typography from '../Typography';
import img from '../../assets/Home/MobileApp/app_demo.svg'
import playStore from '../../assets/Home/MobileApp/play-store.svg'
import appStore from '../../assets/Home/MobileApp/app-store.svg'

const MobileApp = () => {
    return (
      <div className="max-w-screen-max_screen mx-auto xl:px-0  bg-gradient-to-r from-[#FFFDC8] to-[#8CF9DF] md:rounded-2xl lg:mb-28 mb-20">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-12 md:p-16 px-5 py-10  ">
          {/* Left content */}
          <div className="">
            <Typography.Heading1 variant="bold" className="leading-tight">
              <span className="">Learn on the Go with Our </span>
              <span className="bg-gradient text-transparent bg-clip-text">
                Mobile App!
              </span>
              <br />
            </Typography.Heading1>

            <p className="text-[#666666] mt-4 mb-8 text-lg">
              Access all driving courses, mock tests, and video lessons anytime,
              anywhere.
            </p>

            <div className="flex gap-3 mt-10">
              <button>
                <img draggable={false} src={playStore} alt="icon" />
              </button>
              <button>
                <img draggable={false} src={appStore} alt="icon" />
              </button>
            </div>
          </div>

          {/* Right image */}
          <div className="w-fit mx-auto">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={img}
                alt="Woman driving"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default MobileApp;