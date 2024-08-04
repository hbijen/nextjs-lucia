import { PrismaClient } from '@prisma/client';
const prismaClientSingleton = (): PrismaClient => {

    if (process.env.NODE_ENV === "development") {
        const client = new PrismaClient({
            log: [
                {
                    emit: 'event',
                    level: 'query'
                }
            ]
        })
        client.$on('query', async (e: any) => {
            console.log('query: ', e.query)
            console.log('params: ', e.params)
        });
        return client
    } else {
        return new PrismaClient()
    }

}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma