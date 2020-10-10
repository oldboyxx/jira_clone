FROM mhart/alpine-node:14

WORKDIR /app

COPY package*.json ./
COPY .babelrc ./

RUN npm install

COPY . .

ARG API_URL
ENV API_URL $API_URL

RUN npm run build

CMD ["node", "server.js"]
EXPOSE 8081