FROM node:latest

WORKDIR /app/services/post

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY . .

CMD ["node", "index.js"]