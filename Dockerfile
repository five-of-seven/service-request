FROM node:7.6-alpine

RUN npm install -g webpack

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

RUN yarn global add nodemon

EXPOSE 3000

CMD [ "npm", "start" ]