# 📊 BizDash - Business Analytics Dashboard

A modern, responsive business analytics dashboard built with React, TypeScript, and Tailwind CSS. Features real-time data visualization, user management, and comprehensive business metrics tracking.

## 🌟 Live Demo

🔗 **[View Live Demo](http://localhost:5173)** _(Local Development)_

> **Demo Credentials:**
>
> - **Email:** `admin@bizdash.com`
> - **Password:** `admin123`

## ✨ Features

### 📈 **Dashboard Analytics**

- Real-time KPI tracking (Revenue, Users, Conversion Rate, Average Order Value)
- Interactive revenue charts with monthly/quarterly views
- Performance trend indicators with percentage changes
- Top performers leaderboard

### 🔔 **Notifications System**

- Real-time notification dropdown
- Different notification types (Success, Warning, Info)
- Mark as read functionality
- Toast notifications for interactions

### 👥 **User Management**

- User authentication with JWT tokens
- Role-based access control
- Profile management
- User directory with search and filters

### 📦 **Inventory Management**

- Product catalog with categories
- Stock level monitoring
- Low inventory alerts
- Bulk operations support

### 💰 **Sales Tracking**

- Sales transaction history
- Revenue analytics
- Customer purchase patterns
- Sales performance metrics

### 📋 **Reports**

- Comprehensive business reports
- Export functionality
- Data visualization charts
- Custom date range filtering

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### **Styling & UI**

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations and transitions

### **State Management**

- **React Context** - Authentication and global state
- **TanStack Query** - Server state management and caching

### **Routing & Navigation**

- **Wouter** - Lightweight client-side routing

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd BizDash/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Backend Setup

Ensure the backend API is running on `http://127.0.0.1:3001`

```bash
cd ../backend
npm install
npm run dev
```

## 📁 Project Structure

```
frontend/
├── client/                    # Main application source
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── auth/         # Authentication components
│   │   │   ├── dashboard/    # Dashboard-specific components
│   │   │   ├── profile/      # User profile components
│   │   │   └── ui/           # Base UI components (Radix)
│   │   ├── contexts/         # React Context providers
│   │   ├── data/             # Mock data and constants
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions and configs
│   │   ├── pages/            # Page components
│   │   └── services/         # API service layer
│   ├── index.html
│   └── public/               # Static assets
├── server/                   # Development server setup
├── package.json
└── README.md
```

## 🎨 Component Library

### **Dashboard Components**

- `DashboardLayout` - Main layout with sidebar navigation
- `KPICard` - Key performance indicator cards
- `ChartCard` - Revenue and analytics charts
- `ActivityFeed` - Recent activity timeline
- `TopPerformers` - Performance leaderboard

### **UI Components**

Built on Radix UI primitives with custom styling:

- `Button`, `Card`, `Input`, `Select`
- `Dialog`, `Popover`, `Toast`, `Alert`
- `Table`, `Tabs`, `Badge`, `Avatar`
- `Sidebar`, `Navigation`, `Breadcrumb`

## 🔧 Configuration

### **Environment Variables**

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://127.0.0.1:3001/api
VITE_APP_NAME=BizDash
VITE_APP_VERSION=1.0.0
```

### **API Configuration**

The API base URL is configured in `src/services/api.ts`:

```typescript
const API_BASE_URL = "http://127.0.0.1:3001/api";
```

## 📱 Responsive Design

BizDash is fully responsive and optimized for:

- **Desktop** (1920px+)
- **Laptop** (1024px - 1919px)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests** - Component testing with Jest and React Testing Library
- **Integration Tests** - API integration testing
- **E2E Tests** - End-to-end testing with Playwright

## 🚀 Deployment

### **Build for Production**

```bash
npm run build
```

### **Deploy to Vercel**

```bash
npx vercel --prod
```

### **Deploy to Netlify**

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- 📧 Email: support@bizdash.com
- 💬 Discord: [BizDash Community](https://discord.gg/bizdash)
- 📖 Documentation: [docs.bizdash.com](https://docs.bizdash.com)

## 🙏 Acknowledgments

- [React Team](https://reactjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide](https://lucide.dev/) for beautiful icons
- [Vercel](https://vercel.com/) for deployment platform

---

**Built with ❤️ by the BizDash Team**
