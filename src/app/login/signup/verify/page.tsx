import { SimpleForm } from "@/components/forms/simple-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { confirmCode } from "./actions"

export default function VerifyEmail() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Verify Code</CardTitle>
        <CardDescription>
          Please enter the code you recieved in in your email. Unverified logins will be disabled.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SimpleForm action={confirmCode}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">

              <InputOTP maxLength={6} name="verify-email-code">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button type="submit" className="w-full">
              Verify
            </Button>
          </div>
        </SimpleForm>
      </CardContent>
    </Card>
  )
}