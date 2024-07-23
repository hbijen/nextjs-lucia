"use server";

import { ActionResult } from "@/components/forms/simple-form";
import { logger } from "@/lib/logger";
import { disableUser } from "@/lib/service/user-service";

export async function userEnable(formData: FormData): Promise<ActionResult> {

    const id = formData.get('user_id') as string
    logger.info("enable-disable-user",{id})

    disableUser(id, false)

    return {}
}

export async function userDisable(formData: FormData): Promise<ActionResult> {

    const id = formData.get('user_id') as string
    logger.info("enable-disable-user",{id})

    disableUser(id, true)

    return {}
}