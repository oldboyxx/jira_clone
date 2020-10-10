FROM mhart/alpine-node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "-r", "./tsconfig-paths.js", "build/index.js" ]
EXPOSE 3000