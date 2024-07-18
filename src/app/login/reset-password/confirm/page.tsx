import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function SignUp() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Password Updated</CardTitle>
        <CardDescription>
          Your new password has been successfully updated.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="gap-4 text-center">
          <Link href="/">
            <Button>Goto Login page</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}