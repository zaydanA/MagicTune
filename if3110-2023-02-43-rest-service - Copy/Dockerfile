FROM node:16.18

WORKDIR /rest

COPY package.json .
RUN npm install
COPY . .

CMD [ "npm", "start" ]
