import {
    PolarAngleAxis,
    RadialBar,
    RadialBarChart
} from "recharts"
  
  import {
    Card,
    CardContent
} from "@/components//ui/card"
import {
    ChartContainer
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { findActiveUsers } from "./actions"
  
export default function ActiveUsers() {

    const [result, setResult] = useState<any>({})

    useEffect(() => {
        findActiveUsers().then(r => setResult(r))
    }, [])

    return (
        <Card className="max-w-xs">
          <CardContent className="flex gap-4 p-4">
            <div className="grid items-center gap-2">
              {
                result.data?.map((d:any) => {
                  return (
                    <div className="grid flex-1 auto-rows-max gap-0.5">
                    <div className="text-sm text-muted-foreground">{d.label}</div>
                    <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                      {d.count}/{result.total} 
                    </div>
                  </div>
                  )
                })
              }
            </div>
            <ChartContainer
              config={{
                active: {
                  color: "hsl(var(--chart-1))",
                },
                inactive: {
                  color: "hsl(var(--chart-2))",
                }
              }}
              className="mx-auto aspect-square w-full"
            >
              <RadialBarChart
                margin={{
                  left: -10,
                  right: -10,
                  top: -10,
                  bottom: -10,
                }}
                data={result.data}
                innerRadius="30%"
                barSize={12}
                startAngle={90}
                endAngle={450}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  dataKey="value"
                  tick={false}
                />
                <RadialBar dataKey="value" background cornerRadius={5} />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
    )
}