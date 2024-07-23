"use client"
import Link from "next/link"

import { SubmitButton } from "@/components/forms/app-button"
import { SimpleForm } from "@/components/forms/simple-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resetPassword } from "./actions"

export default function Login() {
    return (
        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">Reset Password</CardTitle>
                <CardDescription>
                    Please enter valid email id. The reset passwordza link will be sent to your email.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SimpleForm action={resetPassword}>
                    <div className="grid gap-4">

                        <div className="grid gap-2  ">
                            <Label htmlFor="email">Enter Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <SubmitButton></SubmitButton>
                    </div>
                </SimpleForm>
                <div className="mt-4 text-right text-sm">
                    <Link href={"/login"} className="underline">
                        Sign In
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}