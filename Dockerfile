FROM node:21-alpine

# Set working directory
WORKDIR /usr/src/app

# Install bash (optional, for shell scripts)
RUN apk add --no-cache bash

# Copy package files and tsconfig
COPY package*.json tsconfig.json ./

# Install all dependencies (including devDependencies)
RUN npm install --include=dev

# Copy the rest of the project
COPY . .

# Build TypeScript -> dist/
RUN npm run build

# Run the app using built output
CMD ["node", "dist/server.js"]
