import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ActionResult, SimpleForm } from "../basic/simple-form"
import { hash } from "@node-rs/argon2"
import { createAppUser, findUserByEmail, generateEmailVerificationCode, passwordHashOptions } from "@/lib/service/auth-service"
import { validEmail } from "@/lib/utils"
import { logger } from "@/lib/logger"
import { sendMail } from "@/lib/service/mail-service"
import { renderAsync } from "@react-email/components"
import VerifyEmail from "../../../emails/verify-password/verify-email"
import { redirect } from "next/navigation"
import { lucia } from "@/lib/auth"
import { cookies } from "next/headers"


export function Signup01(props: SignupProps) {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SimpleForm action={signup}>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" name="firstname" placeholder="First" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" name="lastname" placeholder="Last" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
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
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" name="password" />
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                    </div>
                </SimpleForm>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href={props.loginUrl ?? "/login"} className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

async function signup(_: any, formData: FormData): Promise<ActionResult> {
    "use server";
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    if (
        typeof email !== "string" ||
        email.length < 3 ||
        email.length > 31 ||
        !validEmail(email)
    ) {
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
    // check if user is already used
    const appUser = await findUserByEmail(email)
    if (appUser) {
        return {
            error: "Duplicate email exists."
        }
    }
    const passwordHash = await hash(password, passwordHashOptions);
    const newUser = await createAppUser({
        email: email,
        user_id: null,
        provider: "email-password",
        password: passwordHash,
        firstname: firstname as string,
        lastname: lastname as string,
        emailVerified: false
    }).catch(err => {
        logger.debug("create user error===============", err)
        logger.debug("create user error+++++++++++++", JSON.stringify(err))
        return null
    })
    
    logger.debug("user created: ", newUser?.id)

    if (!newUser) {
        return { error: "Unable to create account. Please try again!" }
    }
    
    const verificationCode = await generateEmailVerificationCode(newUser.id);
    const tmpl = <VerifyEmail verificationCode={verificationCode}></VerifyEmail>
    await sendMail(email, "Account Creation", await renderAsync(tmpl))

    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return redirect('./signup/verify')
}