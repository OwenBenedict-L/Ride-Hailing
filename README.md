# Backend Programming Template (2025)

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.

Delete & Get
localhost:5001/api/estimations/"DataBase_Id"
localhost:5001/api/estimations/69e3c37ac4f08e6ddbaa9e67

Post
localhost:5001/api/estimations
{
  "userId": "nama",
  "origin": "lokasi penjemputan",
  "destination": "lokasi tujuan",
  "distance": angka
}

Put
localhost:5001/api/estimations/url/route
{
  "userId": "nama",
  "origin": "lokasi penjemputan",
  "destination": "lokasi tujuan",
  "distance": angka
}
