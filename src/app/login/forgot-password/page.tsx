import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createPasswordResetToken, findUserByEmail } from "@/lib/service/auth-service";
import { logger } from "@/lib/logger"
import { ActionResult, SimpleForm } from "@/components/simple-form"
import { sendMail } from "@/lib/service/mail-service"
import { renderAsync } from "@react-email/components"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import EmailResetPassword from "../../../../emails/reset-password/reset-password"
import { redirect } from "next/navigation"

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

async function resetPassword(_: any, formData: FormData): Promise<ActionResult> {
    "use server";
    const email = formData.get("email");
    logger.info('reset-password', email)
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
    const appUser = await findUserByEmail(email)
    logger.info("appUser.provider ", appUser?.provider)
    if (appUser?.provider == 'email-password') {
        const token = await createPasswordResetToken(appUser.id)
        const resetLink = `${process.env.APP_URL}/login/reset-password/${token}`
        const tmpl = <EmailResetPassword userFirstname={appUser.firstname ?? 'User'} resetPasswordLink={resetLink}></EmailResetPassword>
        await sendMail(email, "Password Reset", await renderAsync(tmpl))
            .catch(err => {
                logger.error('sendmail', err)
                return {
                    error: `Failed. ${err.message}`
                }
            })
    }
    // confirmation is displayed even for oauth users, even though we do not send any reset token
    // its security measure to avoid exposing unnecessary detail to user who may be trying out random email id
    return redirect('./forgot-password/confirm')
}