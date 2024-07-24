import { Button } from "@/components/ui/button";
import { AppUser } from "@/lib/model/user";
import { UserCheck, UserX } from "lucide-react";
import { userDisable, userEnable } from "./actions";

export default async function EnableDisableUser(props: Pick<AppUser, 'id' | 'inactive_at'>) {

    return (
        <form>
            <input name="user_id" type="hidden" defaultValue={props.id}></input>
            {!props.inactive_at &&
                <Button size="sm" className="h-8 gap-1" variant="destructive" type="submit" formAction={userDisable}>
                    <UserX className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Disable
                    </span>
                </Button>
            }
            {props.inactive_at &&
                <Button size="sm" className="h-8 gap-1" variant="secondary" type="submit" formAction={userEnable}>
                    <UserCheck className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Enable
                    </span>
                </Button>
            }
        </form>
    )
}