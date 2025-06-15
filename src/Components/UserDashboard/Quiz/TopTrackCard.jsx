import user from "@/assets/UserDashboard/demoUser.png";
import Typography from "@/Components/Typography";
import coin from "@/assets/UserDashboard/coin.svg";
import img from "@/assets/UserDashboard/top-track-img.svg";
const TopTrackCard = () => {
  return (
    <div className="flex gap-5 items-center bg-white rounded-lg overflow-hidden">
      <div className="p-3 relative">
        <img src={user} alt="user" />
        <span className="bg-blue-600 text-white text-[12px] px-1.5 rounded-full absolute bottom-1 right-[40%]">
          1
        </span>
      </div>

      <div className="flex items-center justify-between w-full">
        <div>
          <Typography.Heading5 className="text-primaryText" variant="semibold">
            Usman Kwaza
          </Typography.Heading5>
          <div className="flex items-center gap-2">
            <img src={coin} alt="coin" />
            <Typography.Body className="text-[#D97706]" variant="medium">
              800 Coins
            </Typography.Body>
          </div>
        </div>
        <img className="w-[72px]" src={img} alt="img" />
      </div>
    </div>
  );
};

export default TopTrackCard;
