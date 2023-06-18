FROM node:latest

WORKDIR /app/services/auth

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY . .

CMD ["node", "index.js"]