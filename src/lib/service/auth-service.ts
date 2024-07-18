/**
 * This file is to directly read/write application DB for authentication/authorization related operations
 */

import { Options } from "@node-rs/argon2";
import prisma from "../db";
import { AppUser } from "../model/user";
import { generateIdFromEntropySize } from "lucia";
import { encodeHex } from "oslo/encoding";
import { alphabet, generateRandomString, sha256 } from "oslo/crypto";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";

export type OAuthProvider = 'google' | 'github' | 'email-password'

export const passwordHashOptions: Options = {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
}

export async function findUserByUserId(id: string, provider: OAuthProvider) {
    return prisma.user.findFirst({
        where: {
            user_id: id,
            provider: provider
        }
    })
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

export async function createAppUser(user: Omit<AppUser, 'id' | 'created_at' | 'updated_at' | 'inactive_at'>) {
    return prisma.user.create({
        data: user
    })
}

export async function createPasswordResetToken(userId: string): Promise<string> {
	// delete all existing tokens for the user
    await prisma.password_reset_token.deleteMany({
        where: {
            userId: userId
        }
    })

	const tokenId = generateIdFromEntropySize(25); // 40 character
	const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));
	await prisma.password_reset_token.create({
        data: {
            token_hash: tokenHash,
            userId: userId,
            expires_at: createDate(new TimeSpan(2, "h"))
        }
    })
    
	return tokenId;
}

export async function generateEmailVerificationCode(userId: string): Promise<string> {

    await prisma.verification_code.deleteMany({where: {userId: userId}})

	const code = generateRandomString(6, alphabet("0-9"));

	await prisma.verification_code.create({
        data: {
            userId: userId,
            code,
            expires_at: createDate(new TimeSpan(15, "m")) // 15 minutes
        }
	});
	return code;
}

export async function validVerificationCode(userId: string, code: string): Promise<boolean> {

    const verificationCode = await prisma.verification_code.findFirst({
        where: {
            userId: userId,
            code: code
        }
    })

    if (!verificationCode || !isWithinExpirationDate(verificationCode.expires_at)) {
        return false;
    }
    
	return true;
}
