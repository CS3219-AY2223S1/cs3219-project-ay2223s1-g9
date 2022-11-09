FROM nikolaik/python-nodejs:python3.10-nodejs18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
ADD utils ./utils

# Run npm install in our local machine
RUN npm install
RUN pip install -r utils/requirements.txt

# Bundle app source
COPY . .

EXPOSE 8002

CMD [ "node", "index.js" ]