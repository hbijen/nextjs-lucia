"use server"

import prisma from "../db"

export async function findUsers() {
    return prisma.user.findMany()
}

export async function inactivate(id: string) {
    return prisma.user.update(
        {
            data: { inactive_at: new Date()},
            where: { id: id }
        }
    )
}