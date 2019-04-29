FROM node:carbon-jessie
WORKDIR usr/projects/mtgx-backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD [ "npm", "start" ]
USER node
