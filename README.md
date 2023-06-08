# SSI Console

## Introduction

The SSI Console aims to provide a seamless experience for issuers and verifiers in the SSI ecosystem. With the SSI Console, issuers and verifiers can create and manage their DIDs, credential issuance flows, and presentation exchanges all in one place. 

The SSI Console leverages the SSI Service API to simplify credential issuance and verification, and make both easy to do via a web interface.  

## Prerequisites

* Node v19.4.0 and npm 9.2.0 or higher [Installation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Docker v20.10.24 or higher [Installation](https://docs.docker.com/get-docker/)
* Docker Compose v.2.17.2  or higher [Installation](https://docker-docs.uclv.cu/compose/install/)

Verify that `node` and `npm` commands are available:

```
node -v
v19.4.0

npm -v
9.2.0
```

Verify that both `docker` and `docker-compose` commands are available:

```
docker --version
Docker version 20.10.24, build 297e128

docker-compose --version
Docker Compose version v2.17.2
```

If you get a Permission Error, it means that your system currently requires docker to be executed as root, and the npm scripts won't work out-of-the-box unless you prefix docker commands with sudo or make it possible to run docker as a non-root user.

## Scripts

### `npm start`
Start the SSI Console in developer mode and SSI Service Docker containers. 

### `npm run dev`
Start the SSI Console in developer mode without also starting the SSI Service. Useful if the SSI Service is already running.

### `npm run build`
Create a production build of the SSI Console.

### `npm run serve`
After running `npm run build`, preview the production build of the SSI Console.

### `npm run cleanup`
Stop and remove the SSI Service Docker containers.

### `npm run pull-service`
Pull the latest SSI Service Docker container image. Runs `docker pull ghcr.io/tbd54566975/ssi-service:main`. 

## Project Resources

| Resource                                   | Description                                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| [CODEOWNERS](./CODEOWNERS)                 | Outlines the project lead(s)                                                   |
| [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) | Expected behavior for project contributors, promoting a welcoming environment |
| [CONTRIBUTING.md](./CONTRIBUTING.md)       | Developer guide to build, test, run, access CI, chat, discuss, file issues     |
| [GOVERNANCE.md](./GOVERNANCE.md)           | Project governance                                                             |
| [LICENSE](./LICENSE)                       | Apache License, Version 2.0                                                    |