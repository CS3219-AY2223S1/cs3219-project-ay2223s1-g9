FROM node:alpine as build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json .

# Run npm install in our local machine
RUN npm install

# Bundle app source
COPY . .

RUN npm run build

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html



