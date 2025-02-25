import { Cell, Pie, PieChart, Tooltip } from "recharts";

const SmallPieChart = ({ primaryColor, secondaryColor, value }) => {
  const data = [{ value: value }, { value: 100 - value }];
  const COLORS = [primaryColor, secondaryColor];

  return (
    <PieChart width={64} height={64}>
      <Pie
        data={data}
        innerRadius={12}
        outerRadius={30}
        dataKey="value"
        startAngle={90}
        endAngle={-270}
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default SmallPieChart;
