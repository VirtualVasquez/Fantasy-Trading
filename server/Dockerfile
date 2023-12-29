# Use a Node.js base image with a specified version
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire local directory into the container at /app
COPY . .

# Epose the port the server listens on
EXPOSE 3001

#Command to start the server
CMD ["npm", "start"]


