FROM node as build

ARG REACT_APP_API_GATEWAY_URL="http://localhost:8010"
# Create app directory
WORKDIR /app

ENV REACT_APP_API_GATEWAY_URL=$REACT_APP_API_GATEWAY_URL

# Install app dependencies
COPY package*.json ./

# Run npm install in our local machine
RUN npm install

# Bundle app source
COPY . .

RUN npm run build

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html



