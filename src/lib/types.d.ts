declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
      interface ProcessEnv {
        EMAIL_SMTP_HOST: string
        EMAIL_SMTP_PORT: number
        EMAIL_SMTP_USER: string
        EMAIL_SMTP_PASS: string
      }
    }
  }