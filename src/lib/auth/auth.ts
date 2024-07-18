/**
 * This file is used for any customization or integration with lucia auth
 */
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { GitHub, Google } from "arctic";

import type { Session, User } from "lucia";
import { OAUTH_ENABLED } from "../utils";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { AppUser } from "../model/user";
import prisma from "../db";
import { logger } from "../logger";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (attributes) => {
		return {
			userId: attributes.user_id,
			provider: attributes.provider,
			email: attributes.email,
			firstname: attributes.firstname,
			lastname: attributes.lastname,
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Pick<AppUser, "user_id" | "email" | "provider" | "firstname" | "lastname">;
	}
}

type UserSession = {
	user: User | null
	session: Session | null
}

export const validateRequest = cache(
	async (): Promise<UserSession> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		const NO_SESSION = { user: null, session: null }

		if (!sessionId) {
			return NO_SESSION;
		}

		// next.js throws when you attempt to set cookie when rendering page
		try {
			const {session, user} = await lucia.validateSession(sessionId);
			if (session && session.fresh) {
				const sessionCookie = lucia.createSessionCookie(session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			logger.verbose('validateRequest', user)
			return {session, user};
	
		} catch (err: any) {
			console.error('validateRequest', err?.status)
		}
		return NO_SESSION
	}
);

export const github = OAUTH_ENABLED.GITHUB
						? new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!)
						: null

export const google = OAUTH_ENABLED.GOOGLE
						? new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, process.env.GOOGLE_REDIRECT_URL!)
						: null
