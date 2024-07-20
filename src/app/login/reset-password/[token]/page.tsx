"use client"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SimpleForm } from "@/components/basic/simple-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useParams } from "next/navigation"
import { changePassword } from "./change-password"
  
export default function ResetPassword() {
    let { token } = useParams();

    return (
        <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Use a mix of letters, numbers. For stronger password you may also include 1 or more special characters (!@#$%^&*).
          </CardDescription>
        </CardHeader>
        <CardContent>        
        <SimpleForm action={changePassword}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Enter Password</Label>
                    <Input
                        id="password1"
                        type="password"
                        name="password1"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Re-enter Password</Label>
                    <Input
                        id="password2"
                        type="password"
                        name="password2"
                        required
                    />
                </div>
                <Input
                    id="token"
                    type="hidden"
                    name="token"
                    value={token}
                    required
                />
                <Button type="submit" className="w-full">
                    Submit
                </Button>
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

