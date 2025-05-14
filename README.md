# Registration Form

A modern React application built with TypeScript, Vite, and Chakra UI. This project implements a responsive and accessible registration form with modern development practices and tooling.

## 🚀 Technologies

- React 19
- TypeScript
- Vite 6
- Chakra UI 3
- React Hook Form
- Zod for validation
- MSW for API mocking
- Vitest for testing

## 📋 Prerequisites

- Node.js (LTS version recommended)
- pnpm (recommended) or npm

## 🛠️ Setup and Installation

1. Clone the repository:
```bash
git clone git@github.com:mintpw/registration-form.git
cd registration-form
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests with Vitest

## 🗂️ Project Structure

```
registration-form/
├── src/                  # Source code
│   ├── assets/           # Static assets
│   ├── components/       # Reusable UI components
│   ├── constants/        # Application constants
│   ├── hooks/            # Custom React hooks
│   ├── mocks/            # MSW API mocks
│   ├── modules/          # Feature-based modules
│   ├── schemas/          # Zod validation schemas
│   ├── test/             # Test files
│   ├── test-utils/       # Testing utilities
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Root component
│   └── main.tsx          # Application entry point
├── public/               # Public assets
├── dist/                 # Production build output
└── vite.config.ts        # Vite configuration
```

## 🔧 Configuration Files

- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite configuration
- `eslint.config.js` - ESLint configuration
- `.prettierrc` - Prettier configuration

## 🧪 Testing

The project uses Vitest and React Testing Library for testing. Tests can be run using:

```bash
pnpm test
```

## 📝 Development Notes

- The project uses the latest React features and best practices
- Chakra UI is used for consistent and accessible UI components
- Form handling is done with React Hook Form and Zod validation
- API mocking is set up with MSW for development and testing
- ESLint and Prettier are configured for code quality and consistency


## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Chakra UI Documentation](https://chakra-ui.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Mock Service Worker Documentation](https://mswjs.io/docs/)
