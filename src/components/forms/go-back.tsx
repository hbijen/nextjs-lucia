import { useRouter } from "next/navigation";
import { Button } from "../ui/button";


type GoBackProps = {
    label?: string
}

export function GoBack(props: GoBackProps) {
    const router = useRouter()
    function back(event: any) {
        event.preventDefault();
        router.back()
    }
    return <Button variant="secondary" className="w-48" onClick={back}>{props.label ?? "Back"}</Button>
}