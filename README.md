# IpritCore

Simple expense tracker.

## How-to run

```bash
$ cp ./env-example ./.env
$ docker compose up -d
$ npx prisma migrate dev
```

## Stacks

- Next.js 15
- Prisma (ORM)
- Neon (Datastore)
- Next Auth (Authentication)
- Vercel (Deployment)
- Docker (Dev Environment)