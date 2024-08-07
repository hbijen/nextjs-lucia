"use server"

import { lucia } from "@/lib/auth"
import { logger } from "@/lib/logger"
import { findUserByEmail, generateEmailVerificationCode, passwordHashOptions } from "@/lib/service/auth-service"
import { sendMail } from "@/lib/service/mail-service"
import { createAppUser } from "@/lib/service/user-service"
import { validEmail } from "@/lib/utils"
import { hash, verify } from "@node-rs/argon2"
import { renderAsync } from "@react-email/components"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import VerifyEmail from "../../../emails/verify-password/verify-email"
import { ActionResult } from "../forms/simple-form"


export async function signup(_: any, formData: FormData): Promise<ActionResult> {
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
        password: passwordHash,
        firstname: firstname as string,
        lastname: lastname as string,
        emailVerified: false,
        inactive_at: null
    }).catch((err: any) => {
        logger.error("error", err)
        logger.error("error", JSON.stringify(err))
        return null
    })
    
    logger.info("user-created", {id: newUser?.id})

    if (!newUser) {
        return { error: "Unable to create account. Please try again!" }
    }
    
    const verificationCode = await generateEmailVerificationCode(newUser.id);
    const tmpl = VerifyEmail({verificationCode})
    await sendMail(email, "Account Creation", await renderAsync(tmpl))

    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return redirect('./signup/verify')
}


export async function signin(_: any, formData: FormData): Promise<ActionResult> {
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
    if (appUser && appUser.inactive_at == null) {
        
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
        error: "Invalid login. Please try again or contact tech support"
    }

}