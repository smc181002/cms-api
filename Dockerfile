FROM node:14

COPY . .
RUN yarn install

CMD yarn start
EXPOSE 3001
