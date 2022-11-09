FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Run npm install in our local machine
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8001

CMD [ "node", "index.js" ]