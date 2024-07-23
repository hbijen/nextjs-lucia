## Pre-requisite
- Docker. Local postgres is launch using the compose file

rename `.env.example` to `.env.local` and set appropriate values

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
- Lucia

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