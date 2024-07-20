import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
	const { user } = await validateRequest();
	if (!user) {
		return redirect("/login");
	}
	return (
		<>
			<h1>Hi, {user.email}!</h1>
			<p>Your user ID is {user.id}.</p>
			<Link href="/user">Manage Users</Link>
			<form action={logout}>
				<button>Sign out</button>
			</form>
		</>
	);
}

async function logout(): Promise<ActionResult> {
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

interface ActionResult {
	error: string | null;
}
