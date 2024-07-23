import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { github, lucia } from "@/lib/auth";
import { createAppUser, findUserByUserId } from "@/lib/service/auth-service";
import { logger } from "@/lib/logger";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("oauth_state")?.value ?? null;

    logger.debug("url", url)
    logger.debug("code", code)
    logger.debug("state", state)
    logger.debug("storedState", storedState)

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github?.validateAuthorizationCode(code);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens?.accessToken}`
			}
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

        let appUser = await findUserByUserId(`${githubUser.id}` , "github")
		if (!appUser) {
            // create a new user entry in the DB
            appUser = await createAppUser({
                email: githubUser.login,
                user_id: `${githubUser.id}`,
                provider: "github",
				firstname: '',
				lastname: '',
				emailVerified: true,
				inactive_at: null
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
        console.error("Error in github callback", e)

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

interface GitHubUser {
	id: string;
	login: string;
}
