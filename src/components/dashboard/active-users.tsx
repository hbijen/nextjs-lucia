import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { LabelList, Pie, PieChart } from "recharts"
import { findActiveUsers } from "./actions"

export default function ActiveUsers() {
  const [result, setResult] = useState<any[]>([])
  const total = result.reduce((acc, curr) => acc + curr.count, 0)
  useEffect(() => {
    findActiveUsers().then(r => setResult(r))
  }, [])

  const chartConfig = {
    active: {
      label: "Active",
      color: "hsl(var(--chart-1))",
    },
    inactive: {
      label: "Inactive",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col max-w-xs">
      <CardHeader className="items-center pb-0">
        <CardTitle>Users Registered</CardTitle>
        <CardDescription>There are a total of <span className="fill-foreground text-lg font-bold">{total}</span> users</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={result} dataKey="count" nameKey="status">
              <LabelList
                dataKey="status"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) => {
                  const item = result.find(d => d.status == value)
                  return `${item.count} ${value}`
                }
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}