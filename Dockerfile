# Nodejs image
FROM node:alpine3.13

# Create user and group
RUN addgroup app && adduser -S -G app app

# Create working directory
WORKDIR /app

# COPY package.json && package-lock.json
COPY package*.json /

# Install npm dependencies & run audit fix for dependencies
RUN npm ci --only=production && npm audit fix

# COPY contents to app
COPY . .

# Set user
USER app

# Expose Port
EXPOSE 8000

# Execute App
ENTRYPOINT ["npm", "start"]