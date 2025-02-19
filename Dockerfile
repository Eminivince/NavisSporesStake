FROM node:18-alpine AS builder

WORKDIR /app

COPY package* tsconfig.json ./

COPY . .

RUN npm install

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/.next /app/.next

EXPOSE 3000

CMD ["npm", "run", "start"]
