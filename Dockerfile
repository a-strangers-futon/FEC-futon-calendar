FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
COPY webpack.config.js /usr/src/app/
COPY . /usr/src/app
RUN npm install
RUN npm run build
EXPOSE 3002
CMD [ "npm", "run", "start" ]
