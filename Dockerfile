# Stage 1 - Auxiliar
FROM node:14.15-alpine3.13 as build
LABEL autodelete="true"
LABEL maintainer="lagden@gmail.com"

ARG NODE_ENV="production"
ARG BASE="/home/node"

ENV NODE_ENV=$NODE_ENV
ENV BASE=$BASE
ENV BASE_APP=$BASE/app

WORKDIR $BASE
ADD --chown=node:node . $BASE_APP

WORKDIR $BASE_APP
RUN npm ci --ignore-scripts --also=dev
RUN npm rb node-sass
RUN npm run build

# -----

# Stage: 2 - Principal
FROM node:14.15-alpine3.13
LABEL maintainer="lagden@gmail.com"

ARG NODE_ENV="production"
ARG BASE="/home/node"

ENV NODE_ENV=$NODE_ENV
ENV BASE=$BASE
ENV BASE_APP=$BASE/app

WORKDIR $BASE
COPY --from=build $BASE_APP/public $BASE_APP/public
COPY --from=build $BASE_APP/server $BASE_APP/server
COPY --from=build $BASE_APP/package.json $BASE_APP
COPY --from=build $BASE_APP/package-lock.json $BASE_APP

WORKDIR $BASE_APP
RUN npm ci --ignore-scripts --production

USER node
