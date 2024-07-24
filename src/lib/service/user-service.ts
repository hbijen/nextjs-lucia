"use server"

import prisma from "../db"
import { Prisma } from '@prisma/client';
import { z } from "zod";
import { AppUser } from "../model/user";
import { Paginated, PaginationParams } from "./pagination-service";
import { createPasswordResetToken } from "./auth-service";

const SearchParams = z.object({
    name: z.string().optional(),
    filter: z.string().optional(),
}).merge(PaginationParams)

export type UserSearchParams = z.infer<typeof SearchParams>

export async function findUsers(params: UserSearchParams): Promise<Paginated<AppUser>> {

    const { name, filter, offset, size } = SearchParams.parse(params)

    const whereParam: Prisma.userWhereInput = {
    };
    if (name) {
        whereParam.OR = [
            { firstname: { startsWith: name, mode: 'insensitive' } },
            { lastname: { startsWith: name, mode: 'insensitive' } },
        ]
    }
    if (filter == 'inactive') {
        whereParam.inactive_at = { not: null }
    } else if (filter == 'active') {
        whereParam.inactive_at = null
    }

    const skip = offset || 0
    const take = size || 10

    const a = prisma.user.count({where: whereParam})

    const b = prisma.user.findMany({
        where: whereParam,
        skip: skip,
        take: take,
        orderBy: [
            { firstname: {sort: "asc"} },
            { lastname: {sort: "asc"} }
        ]
    })

    return Promise.all([a,b]).then(r => {
        return {
            offset: skip,
            size: take,
            total: r[0],
            data: r[1] as AppUser[]
        }
    })
}

export async function disableUser(id: string, disable: boolean) {
    return prisma.user.update(
        {
            data: { inactive_at: disable ? new Date() : null },
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
            data: { inactive_at: new Date() },
            where: { id: id }
        }
    )
}