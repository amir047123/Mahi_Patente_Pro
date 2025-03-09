import Typography from "@/Components/Typography";
import { CheckIcon } from "lucide-react";

const MinisterialQuizCard = ({
  item,
  selectedChapters,
  setSelectedChapters,
}) => {
  const progressWidth = `${
    (item?.count?.completedSubjects * 100) / item?.count?.totalSubjects
  }%`;

  const handleChapterClick = (id) => {
    setSelectedChapters((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((chapterId) => chapterId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const isSelected = selectedChapters.includes(item?._id);

  return (
    <div className="bg-white flex gap-4 rounded-lg sm:max-w-sm relative">
      <div className="flex items-center text-white absolute top-4 right-4">
        <button
          onClick={() => handleChapterClick(item?._id)}
          className={`rounded-full size-6 transition-all ${
            isSelected
              ? "bg-blue-500 text-white p-1"
              : "border-2 border-slate-500"
          } focus:ring-2 focus:ring-secondary outline-none `}
        >
          {isSelected && <CheckIcon size={16} />}
        </button>
      </div>
      <img
        className="max-h-[162px] max-w-[30%] rounded-xl object-cover"
        src={item?.image || item?.icon}
        alt="image"
      />
      <div className="flex flex-col justify-between w-full p-4">
        <div>
          <Typography.Body variant="medium" className="text-secondaryText">
            Chapter {item?.order}
          </Typography.Body>
          <Typography.Heading5
            className="text-primaryText leading-7 mt-1 line-clamp-2"
            variant="semibold"
          >
            {item?.name}
          </Typography.Heading5>
        </div>

        <div className="">
          <Typography.Body className="text-secondaryText">
            {item?.count?.completedSubjects}/{item?.count?.totalSubjects}
          </Typography.Body>
          <div className="w-full bg-[#E1E1E1] rounded-full h-2.5">
            <div
              className="bg-secondary rounded-full h-2.5"
              style={{ width: progressWidth }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinisterialQuizCard;
