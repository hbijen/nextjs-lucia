"use server";

import { ActionResult } from "@/components/forms/simple-form";
import { logger } from "@/lib/logger";
import { AppResponse } from "@/lib/model/app-response";
import { AppUser } from "@/lib/model/user";
import { createAppUser, createPasswordResetToken, findUserByEmail } from "@/lib/service/auth-service";
import { disableUser } from "@/lib/service/user-service";
import { redirect } from "next/navigation";
import EmailAccountCreation from "../../../emails/account-creation/account-creation";
import { renderAsync } from "@react-email/components";
import { sendMail } from "@/lib/service/mail-service";

export async function userEnable(formData: FormData): Promise<ActionResult> {

    const id = formData.get('user_id') as string
    logger.info("enable-disable-user", { id })

    disableUser(id, false)

    return {}
}

export async function userDisable(formData: FormData): Promise<ActionResult> {

    const id = formData.get('user_id') as string
    logger.info("enable-disable-user", { id })

    disableUser(id, true)

    return {}
}

export async function searchUsers(formData: FormData) {
    const text = formData.get("search")
    return text ? redirect(`/user?name=${text}`)
        : redirect(`/user`)
}

export async function filterUsers(formData: FormData) {
    const text = formData.get("filterUser")
    return redirect(`/user?filter=${text}`)
}

export async function addUser(aUser: AppUser): Promise<AppResponse<AppUser>> {
    logger.debug('adduser', aUser)
    const validateUser = AppUser.parse(aUser)

    const appUser = await findUserByEmail(validateUser.email)
    if (appUser) {
        return {
            ok: false,
            error: "Duplicate email exists."
        }
    }

    const user = await createAppUser(validateUser)

    if (process.env.APP_EMAIL_ACCOUNT_CREATION == 'true') {
        await sendAccountCreationLink(user.id, user.firstname ?? user.lastname ?? '', user.email)
    }

    return {
            ok: true,
            data: user as AppUser
        }
}


export async function sendAccountCreationLink(id: string, name: string, email: string) {
    const token = await createPasswordResetToken(id)
    const resetLink = `${process.env.APP_URL}/login/reset-password/${token}`
    const tmpl = EmailAccountCreation({
        userFirstname: name ?? 'User',
        resetPasswordLink: resetLink
    })
    await sendMail(email, "Account Created", await renderAsync(tmpl))
        .catch(err => {
            logger.error('sendmail', err)
            return {
                error: `Failed. ${err.message}`
            }
        })
}