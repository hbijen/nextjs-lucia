import { Login01 } from "@/components/auth/login01";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {

	const { user } = await validateRequest();
	if (user) {
		return redirect("/");
	}

    return (
        <div className="w-full h-screen flex items-center justify-center px-4">
            <Login01></Login01>
        </div>
    )
}