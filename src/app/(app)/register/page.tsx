import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Register01 from "@/components/register/register01";
import Register02 from "@/components/register/register02";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Register() {
    return (
        <Tabs defaultValue="account" className="max-w-2xl">
            <TabsList>
                <TabsTrigger value="account">Example 1</TabsTrigger>
                <TabsTrigger value="password">Example 2</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Register01></Register01>
            </TabsContent>
            <TabsContent value="password">
                <Card className="mx-auto">
                    <CardHeader>
                        <CardTitle>Registration Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Register02></Register02>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}