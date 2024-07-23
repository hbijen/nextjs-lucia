import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { Save } from "lucide-react"
import React from "react"

type AppButtonProps = {
    className?: string
}

// following buttons should be used with forms with server actions
const SubmitButton = function(props: AppButtonProps) {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" className={props.className ?? 'w-full'} disabled={pending}>
            Submit
        </Button>
    )
}

function SaveButton(props: AppButtonProps) {
    const { pending } = useFormStatus()
    const className = "gap-1 " + (props.className ?? '')
    return (
        <Button size="sm" className={className} disabled={pending}>
            <Save className="h-3.5 w-3.5" />
            Save
        </Button>

    )
}

export {
    SubmitButton,
    SaveButton
}