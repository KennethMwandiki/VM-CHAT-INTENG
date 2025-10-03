# Frontend Service (React)

## Build & Run with Docker

1. Build the frontend image:
   ```sh
   docker build -t vmchat-frontend .
   ```
2. Run the frontend container:
   ```sh
   docker run -p 8080:80 vmchat-frontend
   ```

---

For development, use `yarn start` locally.
