# docker build must be run in the root of the repo, not in this (./docker) directory
# ie: docker build -t ssiconsole:latest -f docker/Dockerfile .

# the environment variables SSI_SERVICE and SSI_PORT must be set when running this container

FROM node:20.2.0-alpine3.18 as BUILD

RUN mkdir /opt/ssiconsole
WORKDIR /opt/ssiconsole

COPY . .

RUN npm install
RUN npm build

FROM nginx:alpine3.17-slim

COPY --from=BUILD /opt/ssiconsole/dist/ /usr/share/nginx/html/
COPY docker/default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
