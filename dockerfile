# Step 1: Use Node.js base image
FROM node:18

# Step 2: Set working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first (to leverage Docker cache)
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project to the container
COPY . .

# Step 6: Build the TypeScript files
RUN npm run build

# Step 7: Set environment variables
ENV NODE_ENV=production

# Step 8: Expose port (Make sure your app is running on this port)
EXPOSE 4001

# Step 9: Command to run when container starts
CMD ["npm", "run", "start"]
