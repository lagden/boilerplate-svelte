# Stage: 1
FROM node:12.16-alpine3.11 as build

LABEL autodelete="true"
LABEL maintainer="docker@lagden.in"

ARG PORT=3000
ARG NODE_ENV="development"
ARG VERSION="dev"
ARG BASE="/home/node"

ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV
ENV VERSION=$VERSION
ENV BASE=$BASE
ENV APP=$BASE/app

# Svelte ARGs
ARG APP_NAMESPACE
ARG TARGET_JS
ARG PUBLIC_PATH

ENV APP_NAMESPACE=$APP_NAMESPACE
ENV TARGET_JS=$TARGET_JS
ENV PUBLIC_PATH=$PUBLIC_PATH

WORKDIR $BASE
USER node

RUN mkdir -p $APP
COPY . $APP

WORKDIR $APP
RUN npm ci --ignore-scripts
RUN npm run build

# Stage: 2
FROM node:12.16-alpine3.11

LABEL maintainer="docker@lagden.in"

ARG PORT=3000
ARG NODE_ENV="development"
ARG VERSION="dev"
ARG BASE="/home/node"

ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV
ENV VERSION=$VERSION
ENV BASE=$BASE
ENV APP=$BASE/app

WORKDIR $BASE
USER node

RUN mkdir -p $APP
WORKDIR $APP

COPY --from=build $APP/public $APP/public
COPY --from=build $APP/server $APP/server
COPY --from=build $APP/package.json $APP
COPY --from=build $APP/package-lock.json $APP

RUN npm ci --production --ignore-scripts
