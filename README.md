# HydraSMM - E-commerce Platform for Social Media Services (DEPRECATED)

HydraSMM is a full-featured, open-source e-commerce solution for selling Social Media Marketing (SMM) services, built with a modern tech stack. The project features a reactive frontend, a robust backend with a RESTful API, and an administration panel for complete platform management.

This project was developed as a portfolio piece to demonstrate skills in Full-Stack Development, software architecture, and best coding practices.

## ✨ Key Features

  - **Service Showcase**: A complete catalog to display SMM services.
  - **Secure Authentication**: Registration and login system with JWT (in `HttpOnly` cookies) and CSRF protection.
  - **User Dashboard**: A dedicated area for customers to track their orders and manage their accounts.
  - **Admin Panel**: A comprehensive interface to manage users, services, orders, categories, and social networks.

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, Shadcn/ui |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Authentication** | JWT, bcryptjs |

## 🚀 How to Run The Project Locally

Follow the steps below to set up and run the project in your development environment.

### Prerequisites

  - Node.js (v18 or higher)
  - npm or yarn
  - Docker (or a local PostgreSQL instance)

### 1\. Clone the Repository

```bash
git clone https://github.com/fap233/smmstore-ecommerce-website
cd smmstore-ecommerce-website
```

### 2\. Configure the Backend

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a copy of the environment file
cp .env.example .env
```

**Now, edit the `.env` file** with your PostgreSQL database credentials and other required keys.

```env
# .env example
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/YOUR_DB?schema=public"
JWT_SECRET="GENERATE_A_STRONG_SECRET_KEY"
# ... other variables
```

**Run the database migrations:**

```bash
npx prisma migrate dev
```

### 3\. Configure the Frontend

```bash
# Navigate to the frontend folder (from the project root)
cd frontend

# Install dependencies
npm install
```

### 4\. Create the Admin User

To access the administration panel, you need a user with the `ADMIN` role.

**Option 1 (Recommended): Use the seed script**

```bash
# Inside the /backend folder
npm run prisma:seed
```

**Option 2 (Manual):**

1.  Create a user normally via the `POST /auth/register` route.
2.  Access your PostgreSQL database and run the following SQL command:
    ```sql
    UPDATE "User" SET "role" = 'ADMIN' WHERE "email" = 'your-email@example.com';
    ```

### 5\. Start the Application

You will need two terminals open.

**Terminal 1 (Backend):**

```bash
# Inside the /backend folder
npm run dev
```

**Terminal 2 (Frontend):**

```bash
# Inside the /frontend folder
npm run dev
```

The frontend application will be available at `http://localhost:5173` and the backend at `http://localhost:5000` (or the ports you configure).# Navigate to the backend folder
cd backend
