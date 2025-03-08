"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { CardContent, CardFooter, CardHeader } from "@/Components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/Components/ui/chart";
import Typography from "@/Components/Typography";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Attempts",
    color: "url(#gradient)",
  },
};

export function QuizAttemptCharts() {
  return (
    <div className="bg-white  rounded-2xl lg:col-span-3 col-span-5 overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          {" "}
          <Typography.Heading5 className="text-primaryText">
            Quiz Performance Metrics
          </Typography.Heading5>
          <Select>
            <SelectTrigger className="w-[110px] rounded-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select</SelectLabel>
                <SelectItem value="This year">This year</SelectItem>
                <SelectItem value="This month">This month</SelectItem>
                <SelectItem value="This week">This week</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className=" -ml-7">
        <ChartContainer className="h-[250px] w-full" config={chartConfig}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CB2A8A" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#CB2A8A" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-center text-sm -mt-5 text-secondaryText">
          Week/Month
        </div>
      </CardFooter>
    </div>
  );
}
