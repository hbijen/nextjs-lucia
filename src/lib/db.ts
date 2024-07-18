import { PrismaClient } from '@prisma/client'
import { logger } from './logger';

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
        client.$on('query', async (e) => {
            logger.debug('Query: ' + e.query)
            logger.debug('Params: ' + e.params)
            logger.debug('Duration: ' + e.duration + 'ms')
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