# Build stage
FROM node:25.1.0-bookworm-slim AS builder

# Build arguments for metadata
ARG VERSION=dev
ARG COMMIT_SHA=unknown
ARG BUILD_DATE=unknown

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Production stage - Use Debian Bookworm Slim for better security updates
FROM node:25.1.0-bookworm-slim

# Re-declare build arguments for this stage
ARG VERSION=dev
ARG COMMIT_SHA=unknown
ARG BUILD_DATE=unknown

# Add OCI labels for container metadata
LABEL org.opencontainers.image.title="FOAAS MCP Server"
LABEL org.opencontainers.image.description="MCP server to expose FOAAS (Fuck Off As A Service) functionality to AI clients"
LABEL org.opencontainers.image.version=$VERSION
LABEL org.opencontainers.image.revision=$COMMIT_SHA
LABEL org.opencontainers.image.created=$BUILD_DATE
LABEL org.opencontainers.image.authors="gusztavvargadr"
LABEL org.opencontainers.image.url="https://github.com/gusztavvargadr/foaas-mcp"
LABEL org.opencontainers.image.source="https://github.com/gusztavvargadr/foaas-mcp"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.vendor="gusztavvargadr"

# Install dumb-init for proper signal handling
RUN apt-get update && \
    apt-get install -y --no-install-recommends dumb-init && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Run as non-root user for security
RUN groupadd -g 1001 nodejs && \
    useradd -r -u 1001 -g nodejs nodejs

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    npm cache clean --force

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Set environment
ENV NODE_ENV=production

# Use dumb-init for proper signal handling
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Run stdio MCP server
CMD ["node", "dist/index.js"]
