import {
  Button,
  Heading,
  Text
} from "@react-email/components";
import { EmailTemplate, emailContext } from "../email-template";
import { defaultButton, defaultText, h1 } from "../styles";

interface EmailAccountCreationProps {
  userFirstname: string;
  resetPasswordLink: string;
}

export const EmailAccountCreation = ({
  userFirstname = "User",
  resetPasswordLink = "",
}: EmailAccountCreationProps) => {

  return (
    <EmailTemplate>
      <EmailTemplate.Preview>Account Created</EmailTemplate.Preview>
      <EmailTemplate.Content>
        <Heading style={h1}>Account Created</Heading>
        <Text style={defaultText}>Hi {userFirstname},</Text>
        <Text style={defaultText}>
          Welcome to {emailContext.appName}, your account has been created. In order to login to {emailContext.appName} account, please set your password here:
        </Text>
        <Button style={defaultButton} href={resetPasswordLink}>
          Set password
        </Button>

      </EmailTemplate.Content>
    </EmailTemplate>
  );
};

export default EmailAccountCreation;


