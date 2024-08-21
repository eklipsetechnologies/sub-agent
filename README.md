# ✨⚡️Kare giver Main Addmin⚛️🔥🌟

## Requirement

- node 16

## Project setup

```shell
npm install
```

### Run tests

```shell
npm test
```

### Compiles and hot-reloads for development

```shell
npm start
```

### Compiles and minifies for production

``` shell
npm run build
```

### Lints and fixes files

```shell
npm run lint
```

## DOCKERIZE YOUR REACT APP (LIVE RELOAD INCLUSIVE)

- Create a new ``Dockerfile`` and add the following lines:

``` dockerfile
FROM node:16-alpine3.15
WORKDIR /app
COPY . /app
EXPOSE 8080
RUN apk add --no-cache python3 make g++
RUN npm install
CMD ["npm", "start"]
```

Create a new `docker-compose.yml` and add the following lines:

``` yml
version: "3.9"

services:
  app:
    build:
      context: .
    ports:
    - "8080:8080"
    environment:
      CHOKIDAR_USEPOLLING: "true"
    volumes:
      - /app/node_modules
      - .:/app
```

- To start run `docker-compose up`
- To add new packages after installing them run `docker-compose down -v`, `docker-compose build` and `docker-compose up`

