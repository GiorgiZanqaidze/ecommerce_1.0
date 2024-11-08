# E-Commerce API 🛒

This project is a backend for an e-commerce platform built with NestJS, Prisma ORM, and other modern tools.

## Features ✨

- 🔐 **Authentication**: User login and registration with role-based access.
- 🛍️ **Products**: CRUD operations for product management.
- 🗂️ **Categories**: Organize products into categories.
- 📦 **Orders**: Order management with relation to users and order items.
- 🛠️ **Prisma ORM**: Database interaction through Prisma.
- 🔄 Messaging Queue: Efficient message handling and asynchronous tasks with RabbitMQ.
- 🛡️ **Role-based Access**: Different user roles with specific permissions.

## Technologies Used 🛠️

- 🏗️ **NestJS**: Backend framework.
- 🗃️ **Prisma**: ORM for database interaction.
- 📝 **TypeScript**: Programming language for type safety.
- 🛢️ **PostgreSQL/MySQL/SQLite**: Database systems supported by Prisma.

## Project Structure 📂

```plaintext
├── src
│   ├── auth             # Authentication and authorization logic
│   ├── category         # Product category management
│   ├── common           # Common modules and services
│   ├── order-item       # Handling items within orders
│   ├── orders           # Order management module
│   ├── prisma           # Prisma service for database access
│   ├── products         # Product management module
│   ├── users            # User management module
│   ├── app.module.ts    # Root module
│   ├── app.controller.ts# Application entry point controller
│   └── app.service.ts   # Application services
├── db
│   └── seed.ts          # Database seeding script
├── dist                 # Compiled output
├── test                 # Test files
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Getting Started 🚀

### Prerequisites 🧰

- 🖥️ Node.js
- 🗄️ PostgreSQL/MySQL (or any database supported by Prisma)

### Installation ⚙️

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd ecommerce
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:
   Copy the `.env.example` file to `.env` and update it with your database and other configuration details.

4. Run Prisma migrations to set up the database:

   ```bash
   npx prisma migrate dev
   ```

5. Seed the database (optional):
   ```bash
   npm run seed
   ```

### Running the Application ▶️

- In development mode:

  ```bash
  npm run start:dev
  ```

- In production mode:
  ```bash
  npm run build
  npm run start:prod
  ```

### Testing 🧪

- Run tests:
  ```bash
  npm run test
  ```
