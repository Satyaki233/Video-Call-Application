# Use Node.js official image as base
FROM node:latest

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Install peerjs globally
RUN npm install -g peer

# Copy all files to the container
COPY . .

# Expose ports
EXPOSE 3000 3001

# Start PeerJS server and the application
CMD ["sh", "-c", "peerjs --port 3001 & npm start"]