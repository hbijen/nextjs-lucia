import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { google, lucia } from "@/lib/auth";
import { createAppUser, findUserByUserId } from "@/lib/service/auth-service";
import { logger } from "@/lib/logger";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("oauth_state")?.value ?? null;
    const storedCodeVerifier = cookies().get("code_verifier")?.value ?? null;

    logger.info("google-callback", {code,state,storedState,storedCodeVerifier})

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google?.validateAuthorizationCode(code, storedCodeVerifier!);
		const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens?.accessToken}`
			}
		});
		const googleUser: GoogleUser = await googleUserResponse.json();
        logger.debug('google-user', googleUser)

        let appUser = await findUserByUserId(`${googleUser.sub}`, "google")
		if (!appUser) {
            // create a new user entry in the DB
            appUser = await createAppUser({
                email: googleUser.email,
                user_id: googleUser.sub,
                provider: "google",
				password: null,
				firstname: googleUser.family_name,
				lastname: googleUser.given_name,
				emailVerified: true
            })
		}


        //create a session!
		const session = await lucia.createSession(appUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	} catch (e) {
        console.error("Error in google callback", e)

		if (e instanceof OAuth2RequestError && e.message === "bad_verification_code") {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface GoogleUser {
	sub: string
    given_name: string
    family_name: string
    picture: string
	email: string
    email_verified: boolean
}