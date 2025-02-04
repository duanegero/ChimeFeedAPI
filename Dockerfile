# Use the base Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies (omit dev dependencies for production)
RUN npm ci --omit=dev

# Copy the rest of the application files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Run migrations and start the app
CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]

# Expose the app's port
EXPOSE 3004
