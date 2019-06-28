FROM node:10

ARG NODE_ENV
# Create app directory
WORKDIR /app
RUN npm install -g nodemon@1.11.0
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json yarn.lock ./

RUN npm install 

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]