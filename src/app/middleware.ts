import { logger } from '@/lib/logger'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {

    logger.debug('middleware', {url: request.url, nextUrl: request.nextUrl})

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/*'
    ],
}