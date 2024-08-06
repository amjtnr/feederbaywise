# syntax=docker/dockerfile:1
# Use the official Node.js 18 image based on Alpine
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# # Install dependencies for building native modules
# RUN apk add python3 make g++ \
#   && ln -sf /usr/bin/python3 /usr/bin/python

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install app dependencies including heapdump
RUN npm install

# Bundle app source code
COPY . .

# Expose the port the app runs on
EXPOSE 80

# Define the command to run the app
CMD [ "node", "server.js" ]
