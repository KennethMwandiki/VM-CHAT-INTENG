# VM CHAT INTENG: Dockerized Deployment & Development Guide

## Project Structure

- `/backend` — Node.js backend (API, authentication, integrations)
- `/frontend` — React frontend (UI, static assets)
- `/docker-compose.yml` — Multi-service orchestration

## Prerequisites
- Docker & Docker Compose installed
- Node.js & Yarn (for local dev)

## Quick Start: All Services

1. **Build and start all services:**
   ```sh
   docker-compose up --build
   ```
   - Backend: http://localhost:3000
   - Frontend: http://localhost:8080
   - MongoDB: localhost:27017

2. **Stop all services:**
   ```sh
   docker-compose down
   ```

## Customization
- Edit environment variables in `docker-compose.yml` or use a `.env` file.
- Update Dockerfiles as needed for custom build steps.

## Development Workflow

- **Backend:**
  - Work in `/backend`.
  - Use `yarn dev` or `node server.js` for local dev.
  - Build/test Docker image with `docker build .` in `/backend`.

- **Frontend:**
  - Work in `/frontend`.
  - Use `yarn start` for local dev.
  - Build/test Docker image with `docker build .` in `/frontend`.

## API Access & Integrations
- The backend exposes REST APIs on port 3000.
- MongoDB is available at `mongodb://database:27017` from within containers.
- Integrate with external platforms by extending backend logic.

## Clean Up
```sh
docker-compose down -v
```

---

For Kubernetes deployment, see `/k8s` folder.
