import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text
} from "@react-email/components";
import { ReactNode } from "react";
import { defaultText } from "./styles";

export type EmailProps = {
    baseUrl?: string
    appName?: string
}
export const emailContext: EmailProps = {
    baseUrl: process.env.APP_URL ?? "",
    appName: process.env.EMAIL_APP_NAME ?? "DemoApp"
}

const LogoHeader = () => {
    return (
        <Section style={header}>
            {emailContext.baseUrl
                ? <Img height="100" alt="Logo" src={`${emailContext.baseUrl}/logo/email-logo.png`} />
                : <Img height="100" alt="Logo" src={'/static/email-logo.png'} />
            }
        </Section>
    )
}

const CautionText = () => {
    return (
        <Section>
            <Text style={cautionText}>
                {emailContext.appName} will never email you and ask you to disclose
                or verify your password, credit card, or banking account number.
            </Text>
        </Section>
    )
}

const FooterText = () => {
    return (
        <Text style={footerText}>
        </Text>
    )
}

function EmailPreview({ children }: { children: string }) {
    return (
        <Preview>
            {children}
        </Preview>
    )
}
function EmailContent({ children }: { children: ReactNode }) {
    return (
        <Body style={main}>
            <Container style={container}>
                <Section style={coverSection}>
                    <LogoHeader></LogoHeader>
                    <Section style={mainBody}>
                        {children ? children : 'Email Content Goes Here'}
                    </Section>
                    <Hr style={{ margin: 0 }} />
                    <CautionText></CautionText>
                </Section>
                <FooterText></FooterText>
            </Container>
        </Body>
    )
}

export function EmailTemplate({ children }: { children: ReactNode }) {
    return (
        <Html>
            <Head />
            {children}
        </Html>
    );
}

EmailTemplate.Preview = EmailPreview
EmailTemplate.Content = EmailContent


const main = {
    backgroundColor: "#fff",
    color: "#212121"
};

const container = {
    padding: "20px",
    margin: "0 auto",
    backgroundColor: "#eee",
};

const coverSection = {
    backgroundColor: "#fff"
};

const mainBody = {
    padding: "25px 35px"
};

export const header = {
    backgroundColor: "#252f3d",
    display: "flex",
    padding: "20px 0",
    alignItems: "center",
    justifyContent: "center",
};

const cautionText = {
    ...defaultText,
    padding: "25px",
    margin: "0px"
};

const footerText = {
    ...defaultText,
    fontSize: "12px",
    padding: "0 20px",
};