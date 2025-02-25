import Typography from "@/Components/Typography";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const data = [
  { name: "16/09", pv: 80 },
  { name: "17/09", pv: 25 },
  { name: "18/09", pv: 26 },
  { name: "19/09", pv: 30 },
  { name: "20/09", pv: 80 },
  { name: "21/09", pv: 12 },
];

const getIntroOfPage = (label) => {
  const intros = {
    "16/09": "16/09 Date",
    "17/09": "17/09 Date",
    "18/09": "18/09 Date",
    "19/09": "19/09 Date",
    "20/09": "20/09 Date",
    "21/09": "21/09 Date",
  };
  return intros[label] || "";
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip p-2 bg-white border rounded shadow-md">
        <p className="label font-semibold">{`${label} : ${payload[0].value}%`}</p>
        <p className="intro text-sm text-gray-500">{getIntroOfPage(label)}</p>
        <p className="desc text-xs text-gray-400">
          Anything you want can be displayed here.
        </p>
      </div>
    );
  }
  return null;
};

const DailyErrorRates = () => {
  return (
    <div>
      <Typography.Heading5 className="text-primaryText">
        Daily error rates
      </Typography.Heading5>
      <div className="p-6 flex flex-col justify-between bg-white rounded-2xl border mt-3 h-[273px]">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" className="text-secondaryText text-sm" />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              className="text-secondaryText text-sm"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="pv" barSize={10} fill="#CB2A8A">
              <LabelList
                dataKey="pv"
                position="top"
                formatter={(value) => `${value}%`}
                fill="#333"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyErrorRates;
