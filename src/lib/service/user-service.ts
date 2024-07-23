"use server"

import prisma from "../db"
import { Prisma } from '@prisma/client';

export type SearchParams = {
    name: string
    filter: string
 }
 

export async function findUsers(params: SearchParams) {
    const { name, filter } = params
    
    const whereParam: Prisma.userWhereInput = {
    };
    if (name) {
        whereParam.OR = [
            {firstname: {startsWith: name, mode: 'insensitive' } },
            {lastname: {startsWith: name, mode: 'insensitive'} },
        ]
    }
    if (filter == 'inactive') {
        whereParam.inactive_at = {not: null}
    } else if (filter == 'active') {
        whereParam.inactive_at = null
    }

    return prisma.user.findMany({
        where: whereParam
    })
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

export async function saveUser  (id: string) {
    return prisma.user.update(
        {
            data: { inactive_at: new Date()},
            where: { id: id }
        }
    )
}