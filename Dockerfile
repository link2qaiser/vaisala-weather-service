FROM node:21-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Default port value, will be overridden by environment variables if set
EXPOSE ${PORT:-3000}

# Keep the container running
CMD ["node", "dist/server.js"]