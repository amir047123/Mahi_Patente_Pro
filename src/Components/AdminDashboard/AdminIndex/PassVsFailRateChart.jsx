import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const PassVsFailRateChart = () => {
  // Data for the chart
  const passRate = 72;
  const failRate = 28;

  // Outer ring data (Pass rate)
  const passData = [
    { name: "Passed", value: passRate },
    { name: "Empty", value: 100 - passRate },
  ];

  // Inner ring data (Fail rate)
  const failData = [
    { name: "Failed", value: failRate },
    { name: "Empty", value: 100 - failRate },
  ];

  // Colors
  const PASS_COLOR = "#CB2A8A"; // Pink/magenta color for pass
  const FAIL_COLOR = "#e53e3e"; // Red color for fail
  const EMPTY_COLOR = "#f5f5f5"; // Light gray for empty parts

  return (
    <div className="bg-white lg:col-span-2 col-span-5 rounded-2xl p-5 flex justify-center items-center">
      <div className="h-64 w-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* Outer ring - Pass rate */}
            <Pie
              data={passData}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius="70%"
              outerRadius="85%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell key="pass-filled" fill={PASS_COLOR} />
              <Cell key="pass-empty" fill={EMPTY_COLOR} />
            </Pie>

            {/* Inner ring - Fail rate */}
            <Pie
              data={failData}
              cx="50%"
              cy="50%"
              radius={50}
              startAngle={90}
              endAngle={-270}
              innerRadius="55%"
              outerRadius="65%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell key="fail-filled" fill={FAIL_COLOR} />
              <Cell key="fail-empty" fill={EMPTY_COLOR} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Centered text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-lg font-medium" style={{ color: PASS_COLOR }}>
            Passed: {passRate}%
          </p>
          <p className="text-lg font-medium" style={{ color: FAIL_COLOR }}>
            Failed: {failRate}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default PassVsFailRateChart;
