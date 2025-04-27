# 📚 Backend README (Web Board)

## ✨ Overview

Backend server for the **Web-Board** project, built with **NestJS** and **PostgreSQL**.  
Following a pragmatic **Clean Architecture**.

---

## 🔧 Setup Instructions

### 1. Start Docker (Database)

```bash
docker compose up -d
```

> 📝 **หมายเหตุ**: ใช้ Docker แค่สำหรับ Database (PostgreSQL) เท่านั้น — Backend ยังรันในเครื่องตรง ๆ เพื่อความเร็วในการพัฒนา

> 🔹 Spin up PostgreSQL container.

### 2. Install Dependencies

```bash
cd backend
pnpm install
```

### 3. Migrate Database Schema

```bash
pnpm run migrate:dev
```

> 🔹 Prisma will create database tables based on the schema.

### 4. Seed Example Data

```bash
pnpm run seed
```

> 🔹 Insert sample categories, users, and posts.

### 5. Start the Backend Server

```bash
pnpm run start:dev
```

Server will run at: [http://localhost:3000](http://localhost:3000)

---

## 🔍 Environment Variables

Create a `.env` file in `/backend` folder:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/web_board_db
JWT_SECRET=your-secret-key
```

---

## 📂 Project Structure

```bash
src/
 ├── modules/
 │    ├── posts/
 │    │    ├── dto/
 │    │    ├── entities/
 │    │    ├── posts.controller.ts
 │    │    ├── posts.service.ts
 │    │    └── posts.repository.ts
 │    ├── comments/
 │    └── auth/
 ├── common/
 ├── infrastructure/
 └── main.ts
```

---

## 📒 Notes สำคัญ

- **Authentication**: ใช้ JWT (Json Web Token) สำหรับล็อกอิน
- **Authorization**: เช็กสิทธิ์การแก้ไข / ลบ post หรือ comment
- **Database ORM**: ใช้ Prisma จัดการ schema, migrations, query
- **DTO (Data Transfer Object)**: ใช้ validate ข้อมูลที่รับเข้ามา
- **Entity**: แปลงข้อมูลที่ดึงจาก DB ให้ clean และเหมาะสมท่ี่ใน Service Layer
- **Error Handling**: ใช้ `ForbiddenException` เวลาผู้ใช้ไม่มีสิทธิ์
- **Testing**: มี unit test ครอบคลุม (Service Layer)
- **Folder Structure**: แยกโมดูลชัดเจน (Posts, Comments, Auth)
- **Pragmatic Clean Architecture**: ไม่ซับซ้อนเกินไป

---

## 🗕️ Major Libraries Used

| Package                    | Purpose                   |
| :------------------------- | :------------------------ |
| `@nestjs/common`           | Core NestJS modules       |
| `@nestjs/jwt`              | JWT authentication        |
| `@prisma/client`           | Database ORM (Prisma)     |
| `class-validator`          | Input validation          |
| `class-transformer`        | Data transformation       |
| `passport`, `passport-jwt` | Authentication middleware |
| `jest`, `ts-jest`          | Unit testing framework    |

---

## 📈 Running Unit Tests

Run all tests:

```bash
pnpm run test
```

Or run tests in watch mode:

```bash
pnpm run test:watch
```

---

# 🔥 Final Notes

- Following Clean Architecture (simplified & pragmatic).
- Includes validation, authorization checks.
- Covers important flows with Unit Tests.
- Prisma ORM used to manage database access.
- Project Ready for scale and extend.

---

## 👨‍💼 Author

- Kiattisak T. ([GitHub Profile](https://github.com/t-kiattisak))

---
