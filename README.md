VIBE codeing with Cursor

# VIBE Trading Platform

A real-time trading platform built with React, TypeScript, and WebSocket technology for live market data visualization.

## Features

- Real-time candlestick chart visualization using lightweight-charts
- WebSocket connection for live market data
- Docker containerization for easy deployment
- OpenShift integration for cloud deployment

## Tech Stack

- Frontend: React, TypeScript, Vite
- Charts: Lightweight Charts
- Backend: Node.js
- Containerization: Docker
- Cloud Platform: OpenShift

## Getting Started

### Prerequisites

- Node.js 20+
- Docker and Docker Compose
- OpenShift CLI (for cloud deployment)

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development environment:
   ```bash
   docker-compose up
   ```

The application will be available at:

- Frontend: http://localhost:8080
- WebSocket Server: ws://localhost:3005

### Environment Variables

Create a `.env` file in the server directory with the following variables:

docker build --platform linux/amd64 -t vibe2-client:latest .

# v
