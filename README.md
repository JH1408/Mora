# 🎯 Mora - Language Learning Flashcards

A modern, intuitive flashcard application designed by language learners, for language learners. Built with Next.js, TypeScript, and Tailwind CSS.

![Mora Logo](public/images/mora_logo.png)

## ✨ Features

### 🧠 **Spaced Repetition System**

- Intelligent algorithm that adapts to your learning pace
- Optimized review scheduling based on your performance
- Tracks difficulty ratings and adjusts intervals automatically

### 🎨 **Multiple Content Types**

- **Text cards** - Traditional front/back flashcards
- **Handwriting support** - Draw your own content with mouse, touch, or stylus
- **Text-to-speech** - Hear pronunciation using browser's built-in speech API

### 🔐 **Secure Authentication**

- Google Sign-In integration
- No passwords to remember
- Secure session management

### 📊 **Progress Tracking**

- Detailed study statistics
- Performance analytics
- Progress visualization
- Study session history

## 🛠️ Tech Stack

### **Frontend**

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **React Query** - Data fetching and caching

### **Backend**

- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database queries
- **NextAuth.js** - Authentication system
- **Neon Database** - PostgreSQL hosting

### **Infrastructure**

- **Vercel** - Hosting and deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Neon account)
- Google Cloud Console account

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/flashcard-app.git
cd flashcard-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/flashcard_app"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npm run db:push:dev
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with 💜 for language learners**
