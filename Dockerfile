FROM node:20-bullseye

# Create app directory
WORKDIR /app

# Install dependencies first (copy only package files to leverage Docker cache)
COPY package*.json ./

# Use npm ci for reproducible installs when lockfile exists
RUN npm ci --silent || npm install --silent

# Copy rest of the source
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start Vite in host mode so it's reachable from host machine
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
