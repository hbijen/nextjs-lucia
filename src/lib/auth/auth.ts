/**
 * This file is used for any customization or integration with lucia auth
 */
import { GitHub, Google } from "arctic";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import type { Session, User } from "lucia";
import { redirect } from "next/navigation";
import prisma from "../db";
import { logger } from "../logger";
import { AppUser } from "../model/user";
import { OAUTH_ENABLED } from "../utils";

const adapter = new PrismaAdapter(prisma.session, prisma.users);

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
	// eslint-disable-next-line no-unused-vars
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
		"use server";
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
			logger.verbose('validate-request', user)
			return {session, user};
	
		} catch (err: any) {
			console.error('validate-request', err)
		}
		return NO_SESSION
	}
)

export async function logout() {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}

export const github = OAUTH_ENABLED.GITHUB
						? new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!)
						: null

export const google = OAUTH_ENABLED.GOOGLE
						? new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!, process.env.GOOGLE_REDIRECT_URL!)
						: null
