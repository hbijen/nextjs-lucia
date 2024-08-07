import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SimpleForm } from "../forms/simple-form"
import { signin } from "./action"

export function Login() {

    return (
        <>
            <div className="mb-4">
                <Button variant="outline" className="w-full" asChild>
                    <Link href="/login/google">Login with Google</Link>
                </Button>
            </div>

            <SimpleForm action={signin}>
                <div className="grid gap-4">

                    <div className="grid gap-2  ">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="m@example.com"
                            required
                            defaultValue={"demo@demo.com"}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="/login/forgot-password"
                                className="ml-auto inline-block text-sm underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <Input id="password" type="password" name="password" required defaultValue={"123456"}/>
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>

                    {/* <Button variant="outline" className="w-full" asChild>
                    <Link href="/login/github">Login with GitHub</Link>
                </Button> */}
                </div>
            </SimpleForm>
        </>
    )
}