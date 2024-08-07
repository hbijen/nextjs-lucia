"use server"

import { ActionResult } from "@/components/forms/simple-form"
import { lucia, validateRequest } from "@/lib/auth"
import prisma from "@/lib/db"
import { logger } from "@/lib/logger"
import { validVerificationCode } from "@/lib/service/auth-service"
import { setUserEmailVerified } from "@/lib/service/user-service"
import { redirect } from "next/navigation"

export async function confirmCode(_: any, formData: FormData): Promise<ActionResult> {
    const { user } = await validateRequest();
  
      if (!user) {
          return {
        error: "Unauthorized request"
      }
      }
  
    const code = formData.get('verify-email-code')?.toString()
      const validCode = await validVerificationCode(user.id, code ?? '');
  
    if (!validCode) {
          return {
        error: "Invalid Code."
      }
    }

    await setUserEmailVerified(user.id)
  
    await lucia.invalidateUserSessions(user.id);
    await prisma.verification_code.deleteMany({
      where: {
        code: code,
        userId: user.id
      }
    }).catch((err: any) => {
      logger.error("confirmCode", err)
    })
  
    return redirect('./confirm')
  }