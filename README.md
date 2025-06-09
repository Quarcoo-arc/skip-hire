# Skip Hire

This project is a redesigned version of the **Choose Your Skip Size** page for [We Want Waste](https://wewantwaste.co.uk/), the goal being to revamp the UI/UX of the said page while maintaining its functionality.

## 🛠️ Tech Stack

- **Frontend Framework:** React (via Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Vitest (unit tests for custom hooks and utility functions)
- **Tooling:** ESLint, tsconfig

## 📂 Project Structure

```
src/
├── assets/ # Static assets
├── components/ # Reusable UI components
├── constants/ # Constant values used across the app
├── hooks/ # Custom React hooks
├── tests/ # Test configuration files (Vitest)
├── types/ # TypeScript type definitions
├── utils/ # Utility functions
├── App.tsx # Root component
├── main.tsx # App entry point
└── index.css # Global stylesheet
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Quarcoo-arc/skip-hire.git
cd skip-hire
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Run tests

```bash
npm run test
```

## 🧪 Testing

This project includes unit tests written with Vitest, focusing on:

- [Custom React hooks](/src/hooks)
- [Utility functions](/src/utils/)

## 📱Responsive Design

The skip selection UI has been designed to adapt gracefully to both desktop and mobile devices using Tailwind's utility classes.

## 🧠 Design Approach

- **Functional Separation**: Code is organized by responsibility (components, hooks, utils, etc.)
- **Maintainability**: Used TypeScript and consistent typing for safer and cleaner code.
- **Responsiveness**: Built using Tailwind CSS for mobile-first design.

## 📦 Deployment

A live, testable version of the page is available on [CodeSandbox](https://codesandbox.io/p/github/Quarcoo-arc/skip-hire/main)
