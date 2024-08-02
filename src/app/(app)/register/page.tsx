import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Register01 from "@/components/register/register01";
import Register02 from "@/components/register/register02";
import Register03 from "@/components/register/register03";

export default function Register() {
    return (
        <Tabs defaultValue="example1" className="max-w-2xl">
            <TabsList>
                <TabsTrigger value="example1">Example 1</TabsTrigger>
                <TabsTrigger value="example2">Example 2</TabsTrigger>
                <TabsTrigger value="example3">Example 3</TabsTrigger>
            </TabsList>
            <TabsContent value="example1">
                <Register01></Register01>
            </TabsContent>
            <TabsContent value="example2">
                <Card className="mx-auto">
                    <CardHeader>
                        <CardTitle>Registration Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Register02></Register02>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="example3">
                <Card className="mx-auto">
                    <CardHeader>
                        <CardTitle>With File Upload</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Register03></Register03>
                    </CardContent>
                </Card>
            </TabsContent>

        </Tabs>
    )
}