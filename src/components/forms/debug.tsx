import { IS_DEV } from "@/lib/utils";

export function DevFormError({ useForm }: { useForm: any }) {
    return IS_DEV && Object.keys(useForm.formState.errors).length != 0
        ? (<div className="text-red-600">{JSON.stringify(useForm.formState.errors)}</div>)
        : <></>
}