FROM node:18.12.0-alpine

WORKDIR /srv/service

ENV TMPDIR "../../artifacts/tmp"

RUN npm install

RUN npm run build

CMD npm run start
