# Contract Management Platform

A frontend-only Contract Management Platform built to demonstrate product thinking, UI clarity, controlled state management, and clean frontend architecture.

---

## ✨ Features

- Blueprint creation with configurable fields (Text, Date, Signature, Checkbox)
- Contract creation from reusable blueprints
- Controlled contract lifecycle:
  - Created → Approved → Sent → Signed → Locked
  - Revoked (from Created or Sent)
- State-driven UI with disabled invalid actions
- Contracts dashboard with status indicators
- Clean, minimal, and usable UI

---

## 🧠 Architecture & Design Decisions

- **React + TypeScript** chosen for predictable state management and type safety
- **Context API** used for global state instead of external libraries to keep the solution lightweight
- **Lifecycle rules** implemented as a state machine to prevent invalid transitions
- **Reusable components** (Layout, Card, StatusBadge) to ensure UI consistency
- **Local state / mock persistence** used as backend was not required

---

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- Context API
- Plain CSS (inline styles for simplicity)

---

## 🚀 Setup Instructions

```bash
npm install
npm run dev
