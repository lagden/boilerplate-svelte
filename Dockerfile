# Stage: 1
FROM node:14.15-alpine3.12 as build

LABEL autodelete="true"
LABEL maintainer="lagden@gmail.com"

ARG NODE_ENV="development"
ARG BASE="/home/node"

ENV NODE_ENV=$NODE_ENV
ENV BASE=$BASE
ENV BASE_APP=$BASE/app

# Extra ARGs
ARG VERSION="dev"
ARG APP_ENV="development"
#---
ARG APP_NS
ARG TARGET_JS
ARG BASE_PATH
ARG DEBUG

# Extra ENVs
ENV VERSION=$VERSION
ENV APP_ENV=$APP_ENV
#---
ENV APP_NS=$APP_NS
ENV TARGET_JS=$TARGET_JS
ENV BASE_PATH=$BASE_PATH
ENV DEBUG=$DEBUG

WORKDIR $BASE

ADD --chown=node:node . $BASE_APP

WORKDIR $BASE_APP

RUN npm ci --ignore-scripts --also=dev
RUN npm rb node-sass
RUN npm run build


# Stage: 2
FROM node:14.15-alpine3.12

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
