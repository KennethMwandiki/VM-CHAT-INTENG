# Backend Service (Node.js)

## Build & Run with Docker

1. Build the backend image:
   ```sh
   docker build -t vmchat-backend .
   ```
2. Run the backend container:
   ```sh
   docker run -p 3000:3000 --env-file .env vmchat-backend
   ```

## Environment Variables
- AGORA_APP_ID
- CUSTOMER_KEY
- CUSTOMER_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET

Set these in your `.env` file or pass them as `-e` flags.

---

For development, use `yarn dev` or `node server.js` locally.
