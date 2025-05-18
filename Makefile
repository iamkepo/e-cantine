prisma-seed-dev:
	yarn dotenv -e .env -- npx prisma db seed

prisma-clear:
	yarn dotenv -e .env -- npx ts-node --project tsconfig.local.json --loader ts-node/esm prisma/seeds/clear.ts