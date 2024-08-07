import {
  Heading,
  Section,
  Text
} from "@react-email/components";
import { useContext } from "react";
import { EmailContext, EmailTemplate } from "../email-template";
import { defaultText, h1 } from "../styles";

interface VerifyEmailProps {
  verificationCode?: string
}

export default function VerifyEmail({
  verificationCode = "596853"
}: VerifyEmailProps) {
  const emailContext = useContext(EmailContext)
  return (
    <EmailTemplate>
      <EmailTemplate.Preview>Email Verification</EmailTemplate.Preview>
      <EmailTemplate.Content>

        <Heading style={h1}>Please Verify your email address</Heading>
        <Text style={mainText}>
          Thanks for starting the new {emailContext.appName} account creation process. We
          want to make sure it&apos;s really you. Please enter the following
          verification code when prompted. If you don&apos;t want to
          create an account, you can ignore this message.
        </Text>
        <Section style={verificationSection}>
          <Text style={verifyText}>Verification code</Text>

          <Text style={codeText}>{verificationCode}</Text>
          <Text style={validityText}>
            (This code is valid for 10 minutes)
          </Text>
        </Section>
      </EmailTemplate.Content>
    </EmailTemplate>
  );
}

const verifyText = {
  ...defaultText,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeText = {
  ...defaultText,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
};

const validityText = {
  ...defaultText,
  margin: "0px",
  textAlign: "center" as const,
};

const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mainText = { ...defaultText, marginBottom: "14px" };
