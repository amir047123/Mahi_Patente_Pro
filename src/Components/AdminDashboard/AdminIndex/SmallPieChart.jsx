import { Cell, Pie, PieChart, Tooltip } from "recharts";

const SmallPieChart = ({primaryColor,secondaryColor,value}) => {
  const data = [{ value: value }, { value: 100-value }];
  const COLORS = [primaryColor, secondaryColor];
  return (
    <PieChart width={50} height={50}>
      <Pie
        data={data}
        innerRadius={7}
        outerRadius={20}
        fill="#8884d8"
        dataKey="value"
        startAngle={90}
        endAngle={-270}
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
        <Tooltip />
      </Pie>
    </PieChart>
  );
};

export default SmallPieChart;
