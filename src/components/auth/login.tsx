import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ActionResult, SimpleForm } from "../simple-form";
import { verify } from "@node-rs/argon2";
import { findUserByEmail, passwordHashOptions } from "@/lib/service/auth-service";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logger } from "@/lib/logger"

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
                        <Input id="password" type="password" name="password" required />
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

async function signin(_: any, formData: FormData): Promise<ActionResult> {
    "use server"
    
    const email = formData.get("email");
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (
        typeof email !== "string" ||
        email.length < 3 ||
        email.length > 31 ||
        !emailRegex.test(email)
    ) {
        logger.debug('emailRegex', emailRegex.test(email as string))

        return {
            error: "Invalid email"
        };
    }
    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 6 || password.length > 20) {
        return {
            error: "Invalid password"
        };
    }

    const appUser = await findUserByEmail(email)
    if (appUser) {
        
        const validPassword = await verify(appUser.password!, password, passwordHashOptions);

        if (validPassword) {
            logger.info('Login success: ', appUser?.id)
            const session = await lucia.createSession(appUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            return redirect("/");
        }
    }
    logger.info(`Login failed`, {user_id: appUser?.id})
    return {
        error: "Invalid email or password."
    }

}