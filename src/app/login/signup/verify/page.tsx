import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ActionResult, SimpleForm } from "@/components/simple-form"
import { Button } from "@/components/ui/button"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { lucia, validateRequest } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/db"
import { validVerificationCode } from "@/lib/service/auth-service"

export default function VerifyEmail() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Verify Code</CardTitle>
        <CardDescription>
          Please enter the code you recieved in in your email.
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


async function confirmCode(_: any, formData: FormData): Promise<ActionResult> {
  "use server"
  const { user } = await validateRequest();

	if (!user) {
		return {
      error: "Unauthorized request"
    }
	}

  const code = formData.get('verify-email-code')?.toString()
	const validCode = await validVerificationCode(user.id, code ?? '');

  if (!validCode) {
		return {
      error: "Invalid Code."
    }
  }

  await lucia.invalidateUserSessions(user.id);
  await prisma.verification_code.deleteMany({
    where: {
      code: code,
      userId: user.id
    }
  }).catch(err => {

  })

  return redirect('./confirm')
}