FROM node:16-alpine3.15
WORKDIR /app
COPY . /app
EXPOSE 8080
RUN apk add --no-cache python3 make g++
RUN npm install --legacy-peer-deps
CMD ["npm", "start"]