# 🖥️ Frontend README (Web Board)

Welcome to the **Web-Board Frontend**! 🎨  
Frontend ของระบบเว็บบอร์ดนี้สร้างด้วย **Next.js 15**, **TailwindCSS**, และ **React 19** บนพื้นฐาน Clean Architecture + Modular Structure.

---

## 📆 Project Structure

```bash
frontend/
├── public/                # Static files (favicon, assets)
├── src/
│   ├── app/                # Next.js App Router
│   ├── domain/             # Business domains (auth, posts, category)
│   ├── hooks/              # Reusable hooks
│   ├── lib/                # Libraries (fetchers, utils, types)
│   ├── services/           # API call services
│   └── shared/             # Shared UI components
├── .env.local              # Environment variables
├── tailwind.config.ts      # TailwindCSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project metadata
```

---

## ⚙️ Tech Stack & Libraries Used

| Technology / Library                     | Purpose                                 |
| :--------------------------------------- | :-------------------------------------- |
| **Next.js 15**                           | React Framework (App Router, Turbopack) |
| **React 19**                             | UI Library                              |
| **TailwindCSS 4**                        | Utility-first CSS Framework             |
| **@tanstack/react-query**                | Data fetching and caching               |
| **axios**                                | HTTP client                             |
| **zod**                                  | Schema validation                       |
| **react-hook-form**                      | Form management                         |
| **radix-ui**                             | Accessible UI primitives                |
| **next-auth**                            | Authentication solution                 |
| **next-themes**                          | Theme management (Dark/Light mode)      |
| **clsx, class-variance-authority (cva)** | Classname utilities                     |
| **sonner**                               | Toast notification library              |
| **dayjs**                                | Date manipulation                       |
| **tw-animate-css**                       | Tailwind animation extensions           |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set environment variables

สร้างไฟล์ `.env.local` และกำหนดค่า API Endpoint:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key
```

> 🔹 ต้องมีการตั้งค่า NextAuth ด้วย เพื่อรองรับการ login ผ่าน backend

### 3. Run the Development Server

```bash
pnpm run dev
```

เปิด browser ที่:  
`http://localhost:3001`

> 🔥 อย่าลืมให้ backend เปิดทำงานก่อน!

---

## 🔧 Build and Start Production

```bash
pnpm run build
pnpm run start
```

---

## 📚 Notes

- ✨ ใช้ **Next.js App Router** (`src/app/`) เพื่อรองรับ nested routing, layouts
- ✨ ใช้ **Turbopack** ในโหมด dev เพื่อความรวดเร็ว
- ✨ ใช้ **Tanstack Query** ในการ fetch ข้อมูล พร้อมกับ caching
- ✨ API call ถูกแยกใน `services/` และ utilities อยู่ใน `lib/`
- ✨ ใช้ **Zod** ร่วมกับ **react-hook-form** เพื่อ validate form อย่างปลอดภัย
- ✨ มี custom hooks เช่น `useMediaQuery` และ `useDebouncedValue` เพื่อช่วย performance
- ✨ ใช้ Radix UI และ Vaul เพื่อสร้าง Accessible Components

### Directory Responsibility

| Folder          | Responsibility                        |
| :-------------- | :------------------------------------ |
| `domain/`       | Business logic หรือ State layer       |
| `hooks/`        | Custom reusable React Hooks           |
| `lib/`          | Utilities / API Calls / Helpers       |
| `services/`     | Call API แยกเป็น module service       |
| `shared/`       | Shared Components เช่น Button, Input  |
| `middleware.ts` | ใช้ intercept auth หรือ public routes |

---

## 👨‍💻 Author

- **Kiattisak T.** ([@t-kiattisak](https://github.com/t-kiattisak))

---

> 🌟 Frontend is ready to connect to backend!
