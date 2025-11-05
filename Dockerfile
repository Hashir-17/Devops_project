# Step 1: Build the React App
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy all files and build the app
COPY . ./
RUN npm run build

# Step 2: Serve the App
FROM nginx:alpine

# Copy the build folder from the previous image
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
