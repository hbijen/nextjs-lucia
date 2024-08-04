"use server"

import { ActionResult } from "@/components/forms/simple-form";
import { lucia } from "@/lib/auth";
import prisma from "@/lib/db";
import { logger } from "@/lib/logger";
import { passwordHashOptions } from "@/lib/service/auth-service";
import { hash } from "@node-rs/argon2";
import { redirect } from "next/navigation";
import { isWithinExpirationDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";

export async function changePassword(verifytoken: string, _:any, formData: FormData): Promise<ActionResult> {
    
    const password1 = formData.get("password1");
    const password2 = formData.get("password2");

    if (typeof password1 !== "string" || password1.length < 6) {
        return {
            error: "Enter min 6 letters"
        }
    }
    if (password1 !== password2) {
        return {
            error: "Entered passwords do not match."
        }
    }

    const tokenHash = encodeHex(await sha256(new TextEncoder().encode(verifytoken?.toString())));

    // check if token is valid
    const token = await prisma.password_reset_token.findFirst({
        where: {
            token_hash: tokenHash
        }
    })
    logger.info("change-password", token?.userId)

    if (token) {
        await prisma.password_reset_token.deleteMany({
            where: {
                token_hash: tokenHash
            }
        })
    }

    if (!token || !isWithinExpirationDate(token.expires_at)) {
        return {
            error: "Invalid or expired token. Please use forgot password to reset your password."
        }

    }

    await lucia.invalidateUserSessions(token.userId);

    const passwordHash = await hash(password1, passwordHashOptions);

    const user = await prisma.users.findUnique({ where: { id: token.userId } })

    if (user?.provider == 'email-password') {
        await prisma.users.update({
            data: {
                password: passwordHash,
                emailVerified: true,
                inactive_at: null
            },
            where: {
                id: token.userId
            }
        }).catch(err => {
            logger.error("changePassword", err)
            return {
                success: "Password update failed. If error persists, Please use forgot password to reset your password."
            }
        })
        redirect('./confirm')
    }
    return {
        error: `Password cannot be changed. Your account was setup using ${user?.provider}`
    }

}