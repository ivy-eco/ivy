FROM node:22-alpine AS build

WORKDIR /app

RUN apk add --no-cache git

COPY package*.json ./
RUN npm cache clean --force
RUN npm install

COPY . .
RUN npm run build

RUN cd dashboard && npm install && npm run build

FROM node:22-alpine

RUN apk add --no-cache chromium

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/dashboard/dist ./dashboard/dist

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

EXPOSE 3000

CMD ["node", "dist/main"]
