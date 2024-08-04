
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Login } from "./login"
import { LoginProps } from "./types"

export function Login01(props: LoginProps) {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Login></Login>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href={props.signupUrl ?? "/login/signup"} className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
