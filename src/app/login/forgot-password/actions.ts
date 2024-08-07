"use server";

import { ActionResult } from "@/components/forms/simple-form";
import { logger } from "@/lib/logger";
import { createPasswordResetToken, findUserByEmail } from "@/lib/service/auth-service";
import { sendMail } from "@/lib/service/mail-service";
import { renderAsync } from "@react-email/components";
import { redirect } from "next/navigation";
import EmailResetPassword from "../../../../emails/reset-password/reset-password";

export async function resetPassword(_: any, formData: FormData): Promise<ActionResult> {

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
    if (appUser) {
        // for email based account, if user is inactive/disabled they must be enabled first by an admin
        if (appUser.provider == 'email-password' && appUser.inactive_at == null) {
            const token = await createPasswordResetToken(appUser.id)
            const resetLink = `${process.env.APP_URL}/login/reset-password/${token}`
            const tmpl = EmailResetPassword({
                userFirstname: appUser.firstname ?? 'User',
                resetPasswordLink: resetLink
            })
            await sendMail(email, "Password Reset", await renderAsync(tmpl))
                .catch((err: any) => {
                    logger.error('sendmail', err)
                    return {
                        error: `Failed. ${err.message}`
                    }
                })
        }

    }
    // confirmation is displayed even for oauth users, even though we do not send any reset token
    // its security measure to avoid exposing unnecessary detail to user who may be trying out random email id
    return redirect('./forgot-password/confirm')
}