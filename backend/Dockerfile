# ============================================
# CreativeMicroInk Backend - Production Dockerfile
# Multi-stage build for optimized image size
# ============================================

# Stage 1: Build Stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies for native modules (if needed)
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Prune dev dependencies after build
RUN npm prune --production

# ============================================
# Stage 2: Production Stage
FROM node:20-alpine AS production

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S expressjs -u 1001 -G nodejs

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy production dependencies from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/dist ./dist

# Set ownership to non-root user
RUN chown -R expressjs:nodejs /app

# Switch to non-root user
USER expressjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3001/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Start the application
CMD ["node", "dist/index.js"]

# ============================================
# Build and Run Instructions:
#
# Build the image:
#   docker build -t creativemicroink-api .
#
# Run the container:
#   docker run -p 3001:3001 \
#     -e DATABASE_URL=postgresql://... \
#     -e JWT_SECRET=your-secret \
#     -e FRONTEND_URL=https://your-frontend.com \
#     -e CLOUDINARY_CLOUD_NAME=your-cloud \
#     -e CLOUDINARY_API_KEY=your-key \
#     -e CLOUDINARY_API_SECRET=your-secret \
#     creativemicroink-api
#
# Docker Compose (recommended for development):
#   docker-compose up --build
# ============================================
