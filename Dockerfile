# Dockerfile will build typescript project (that uses node:16) and run it.

# Build the project
FROM node:18 as builder
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

# Run the project
FROM node:18
WORKDIR /app
COPY package.json ./
RUN yarn install --production
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV NODE_PATH=dist/ 

ENTRYPOINT [ "yarn", "start" ]