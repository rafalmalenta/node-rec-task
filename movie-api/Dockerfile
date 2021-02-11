FROM node:14.15-alpine

WORKDIR /app
RUN npm install -g nodemon
COPY package.json ./
RUN npm install

RUN mkdir ./src
COPY ./src ./src

RUN mkdir ./tests
copy ./tests ./tests

CMD ["nodemon","-L"]