FROM node:16.13-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force

FROM dependencies as release
COPY . .

USER node
EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]