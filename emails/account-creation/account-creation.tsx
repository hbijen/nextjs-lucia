import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailResetPasswordProps {
  userFirstname: string;
  resetPasswordLink: string;
}

const baseUrl = process.env.APP_URL ?? ""
const appName = process.env.EMAIL_APP_NAME ?? "DemoApp"

export const EmailAccountCreation = ({
  userFirstname = "User",
  resetPasswordLink = "",
}: EmailResetPasswordProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/logo/logo.png`}
            width="40"
            height="33"
            alt="Logo"
          />
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
              Welcome to {appName}, your account has been created. In order to login to {appName} account, please set your password here:
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Set password
            </Button>
            <Text style={text}>Thank You!</Text>
            <Text style={text}>{appName} Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailAccountCreation;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
