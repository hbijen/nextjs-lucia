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
        <CardTitle className="text-xl">Reset Password Link Sent</CardTitle>
        <CardDescription>
          Please check your email to reset your password.
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