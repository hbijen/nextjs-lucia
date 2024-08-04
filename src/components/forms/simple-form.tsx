"use client";

import { ReactNode } from "react";
import { useFormState } from "react-dom";

export function SimpleForm({
	children,
	action
}: {
	children: ReactNode;
	// eslint-disable-next-line no-unused-vars
	action: (prevState: any, formData: FormData) => Promise<ActionResult>
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
