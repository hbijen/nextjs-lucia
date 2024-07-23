"use server"

import prisma from "../db"
import { AppUser } from "../model/user"

export async function findUsers() {
    return prisma.user.findMany()
}

export async function disableUser(id: string, disable: boolean) {
    return prisma.user.update(
        {
            data: { inactive_at: disable? new Date(): null},
            where: { id: id }
        }
    )
}

export async function getUser(id: string) {
    return prisma.user.findUnique({
        select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            provider: true,
            user_id: true,
            emailVerified: true,
            created_at: true,
            updated_at: true
        },
        where: {
            id: id
        }
    })
}

export async function saveUser(id: string) {
    return prisma.user.update(
        {
            data: { inactive_at: new Date()},
            where: { id: id }
        }
    )
}