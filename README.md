## Pre-requisite
- Docker. Local postgres is launched using the compose file

rename `.env.example` to `.env.local` and set appropriate values

## About
A starter template that has following built-in
- [x] authentication password and google oauth
- [x] sending out email
- [x] auto generate forms using zod schema

And following planned
- [ ] integrate payment
- [ ] S3 or alternate object store for document storage
- [ ] notification via telegram api


## Getting Started

To run the development server. 

```sh
npm run start-db
npm run dev
# or
yarn start-db
yarn dev
# or
bun start-db
bun dev
```

Create/Sync database tables with prisma models
```sh
npx prisma db push
```

## Dependencies

### Authentication
[Lucia](https://lucia-auth.com/)

### Forms
Makes use of [AutoForm](https://github.com/vantezzen/auto-form). Generates the form UI from zod schema. 

### ORM
- prisma. so that we can change to any of the supported databases. and ofcourse the ease of db migration

### Email
- react-email: Starts a local development server to preview the email templates before sending them out. nicely done
- @react-email/components: to create email templates
- nodemailer: sends email via smtp

## Loading test data using synth

install synth. 

create synth schema from existing database schema
```sh
synth import --from postgres://test:test@localhost:5454/test --schema public data
```

load generated data into the db
```sh
synth generate --scenario users-only --size 54 --to postgres://test:test@localhost:5454/test --schema public data
```