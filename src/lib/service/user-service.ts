"use server"

import { Prisma } from '@prisma/client';
import { z } from "zod";
import prisma from "../db";
import { AppUser, toAppUser } from "../model/user";
import { Paginated, PaginationParams } from "./pagination-service";

const SearchParams = z.object({
    name: z.string().optional(),
    filter: z.string().optional(),
}).merge(PaginationParams)

export type UserSearchParams = z.infer<typeof SearchParams>

export async function findUsers(params: UserSearchParams): Promise<Paginated<AppUser>> {

    const { name, filter, offset, size } = SearchParams.parse(params)

    const whereParam: Prisma.usersWhereInput = {
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

    const a = prisma.users.count({where: whereParam})

    const b = prisma.users.findMany({
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
    return prisma.users.update(
        {
            data: { inactive_at: disable ? new Date() : null },
            where: { id: id }
        }
    )
}

export async function getUser(id: string): Promise<AppUser | null> {
    return prisma.users.findUnique({
        select: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            provider: true,
            user_id: true,
            emailVerified: true,
            created_at: true,
            updated_at: true,
            inactive_at: true
        },
        where: {
            id: id
        }
    }).then(r => r ? toAppUser(r) : null)
}

export async function saveUser(id:string, user: AppUser) {
    const {firstname, lastname} = user
    return prisma.users.update(
        {
            data: { firstname, lastname },
            where: { id: id }
        }
    )
}

export async function createAppUser( user: AppUser ) {
    return prisma.users.create({
        data: {
            email: user.email!,
            provider: "email-password",
            firstname: user.firstname,
            lastname: user.lastname,
            emailVerified: user.emailVerified,
            inactive_at: user.inactive_at,
            password: user.password
        }
    })
}

export async function setUserEmailVerified( userid: string ) {
    return prisma.users.update(
        {
            data: { 
                emailVerified: true,
                inactive_at: null
            },
            where: { id: userid }
        }
    )

}
