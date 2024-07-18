"use client";

import { useFormState } from "react-dom";

export function SimpleForm({
	children,
	action
}: {
	children: React.ReactNode;
	action: (prevState: any, formData: FormData) => Promise<ActionResult>;
}) {
	const [state, formAction] = useFormState(action, {});
	return (
		<form action={formAction}>
			{children}
			{state?.error && <p className="text-red-600 px-2 py-2">{state?.error}</p> }
			{state?.success && <p className="text-green-600 px-2 py-2">{state?.success}</p> }
		</form>
	);
}

export interface ActionResult {
	error?: string
	success?: string
}
