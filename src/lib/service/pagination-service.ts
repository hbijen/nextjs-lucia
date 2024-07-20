import prisma from "../db";


export async function findPaginated<T>(collection: string, where: {[key:string]: any}): Promise<T[]> {
    return []
}

