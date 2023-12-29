# Use a Node.js base image with a specified version
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package.
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire local directory into the container at /app
COPY . .

# Build the React app ( adjust the build command if needed)
RUN npm run build

# Expose the port
EXPOSE 3000

#Command to start the React App
CMD [ "npm", "start"]