# Meet Your Friend 🤝

A modern, premium friendship platform with AI-powered chat, photo gallery, and call features.

## Features ✨

- 💬 **Smart Chat** - AI-powered conversations with Sapna
- 📸 **Photo Gallery** - Upload, organize, and share memories
- 📞 **Call Interface** - Premium call UI with audio controls
- 🎨 **Beautiful Design** - Glassmorphism, gradients, smooth animations
- 📱 **Responsive** - Works perfectly on all devices
- 🔒 **Secure** - API keys protected on backend

## Tech Stack 🛠️

**Frontend:**
- React 18 with TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Lucide Icons
- React Query

**Backend:**
- Node.js with Express
- TypeScript
- OpenAI API
- Rate Limiting
- CORS

## Installation 🚀

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/meet-your-friend.git
cd meet-your-friend
\`\`\`

### 2. Install Frontend Dependencies
\`\`\`bash
cd frontend
npm install
\`\`\`

### 3. Install Backend Dependencies
\`\`\`bash
cd ../backend
npm install
\`\`\`

### 4. Environment Setup

Copy environment files:
\`\`\`bash
# Frontend
cd frontend
cp .env.example .env

# Backend
cd ../backend
cp .env.example .env
\`\`\`

Add your OpenAI API key to `backend/.env`:
\`\`\`env
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

### 5. Run Development Servers

**Backend:**
\`\`\`bash
cd backend
npm run dev
\`\`\`

**Frontend:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`

Open http://localhost:5173

## Deployment 🌐

### Frontend (Vercel)
\`\`\`bash
cd frontend
npm run build
vercel --prod
\`\`\`

### Backend (Render)
\`\`\`bash
cd backend
npm run build
# Deploy dist folder to Render
\`\`\`

## Customization 🎨

### Change Sapna's Personality
Edit `frontend/src/services/characterMemory.ts`:
\`\`\`typescript
export const characterMemory = {
  name: "Sapna",
  city: "Morena",
  favoriteColor: "Blue",
  // Add more traits
};
\`\`\`

### Change Chat Style
Modify `SYSTEM_PROMPT` in `frontend/src/hooks/useChat.ts`

## License 📄
MIT License - feel free to use and modify!

## Support 💬
For issues, create a GitHub issue or contact the maintainer.
