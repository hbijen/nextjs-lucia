import {
  Button,
  Heading,
  Text
} from "@react-email/components";
import { EmailTemplate, emailContext } from "../email-template";
import { defaultButton, defaultText, h1 } from "../styles";

interface EmailResetPasswordProps {
  userFirstname: string;
  resetPasswordLink: string;
}

export const EmailResetPassword = ({
  userFirstname = "User",
  resetPasswordLink = "",
}: EmailResetPasswordProps) => {

  return (
    <EmailTemplate>
      <EmailTemplate.Preview>Reset your password</EmailTemplate.Preview>
      <EmailTemplate.Content>

        <Heading style={h1}>Reset Password</Heading>
        <Text style={defaultText}>Hi {userFirstname},</Text>
        <Text style={defaultText}>
          Someone recently requested a password change for your {emailContext.appName}
          {" "}account. If this was you, you can set a new password here:
        </Text>
        <Button style={defaultButton} href={resetPasswordLink}>
          Reset password
        </Button>
        <Text style={defaultText}>
          If you don&apos;t want to change your password or didn&apos;t
          request this, just ignore and delete this message.
        </Text>
      </EmailTemplate.Content>
    </EmailTemplate>
  );
};

export default EmailResetPassword;