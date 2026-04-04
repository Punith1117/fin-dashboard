# Financial Dashboard

**A modern finance dashboard that enables users to track income and expenses, explore transaction history, and gain insights into spending patterns through interactive analytics.**

Designed with production-grade frontend patterns including scalable state management, RBAC, and real-time data visualization.

## [🚀 Live Demo](https://fin-dashboard-punith1117.netlify.app)


## ✨ Key Features

**Core Dashboard**
- Real-time balance, income, and expense metrics
- Monthly balance trends (Line chart)
- Spending distribution by category (Pie chart)
- Fully responsive design to support multiple devices

**Transaction Management**
- Full CRUD operations with form validation
- Search, filter (category/type), sort (date/amount)
- Pagination for large datasets
- Local storage persistence

**Advanced Analytics**
- Highest spending category detection
- Month-over-month comparisons
- Savings rate calculation

**User Experience**
- Dark mode toggle
- Micro-interactions (hover, tooltip transition, sticky UI)
- Role-based access control (RBAC for Admin/Default user)

## 🏗️ Technical Highlights

**State Management (Zustand)**
```
3 dedicated stores:
├── useTransactionStore.js  # CRUD + derived selectors (income/expense/balance)
├── useAuthStore.js        # RBAC (Admin: mutate, Viewer: add-only)
└── useDarkModeStore.js    # Theme persistence
```
- **Derived selectors**: Calculations (balance, totals) computed on-demand, no redundant state
- **RBAC guards**: Authorization checked in store actions, not just components
- **Persistence**: LocalStorage + Zustand middleware

**Performance & Architecture**
- Efficient state updates using Zustand selectors
- Debounced search for real-time filtering
- Custom hooks (`useDebounce`) for optimization
- Derived state prevents unnecessary computations

**Security Simulation**
- Frontend RBAC: Admin can add/edit/delete, Viewer add-only
- Role toggle for demo purposes

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + Vite |
| State | Zustand 5 |
| Styling | Tailwind CSS 3 |
| Charts | Recharts 3 |
| Icons | Lucide React |
| Utils | Custom hooks + formatters |

## 🗂 Architecture Overview

**Feature-Sliced Organization**
```
src/
├── components/
│   ├── Common/         # Reusable: Modal
│   ├── Summary/        # StatsGrid, InsightsSection, Charts
│   └── Transactions/   # Forms, List, Controls, Pagination
├── store/              # Domain stores
│   ├── useTransactionStore.js  # CRUD + selectors
│   ├── useAuthStore.js         # RBAC
│   └── useDarkModeStore.js     # Theme
├── utils/              # Pure functions
│   ├── formatters.js   # Currency, dates
│   ├── storage.js      # LocalStorage sync
│   ├── insightUtils.js # Derived metrics
│   └── chartDataUtils.js
├── hooks/              # Custom: useDebounce
└── constants/          # categories.js
```

**Core Principles**
- **Domain separation**: One store per bounded context
- **Derived state**: Selectors compute totals/insights (no duplication)
- **Zustand actions**: RBAC guards + persistence middleware
- **Unidirectional flow**: UI → Store → Derived → Render
- **Testable utils**: Pure functions for calculations/export

## 🔍 Feature Deep Dive

### Transaction System
- **CRUD**: Prepend adds, synchronous updates, auto-ID/timestamps
- **Controls**: Debounced search + multi-filter + sort
- **List**: Paginated list, modal edit/delete (Admin only)

### Analytics Engine
- **Insights**: Highest category, MoM delta, savings rate
- **Alerts**: Overspending detection via thresholds
- **Charts**: Recharts with responsive tooltips

### RBAC Implementation
```
Admin: add/edit/delete + full UI
Viewer: add-only + masked controls
Enforced in store actions and UI
```

## 🎨 UI/UX Highlights

- **Responsive**: Mobile-first breakpoints, adaptive charts
- **Dark Mode**: CSS vars + Zustand persistence
- **Polish**: Hover states, focus rings, sticky header
- **Accessibility**: Semantic HTML, ARIA labels(modals, forms)

## 🏁 Quick Start

```bash
git clone <repo> fin-dashboard
cd fin-dashboard
npm install
npm run dev
```

**Scripts**: `dev` | `build` | `lint` | `preview`

## 🚀 Future Improvements

- PWA + service workers
- Export CSV/PDF reports
- API integration (mock server)
- Advanced filtering (date ranges)
- Unit tests (Vitest + MSW)

---

**Built with production patterns for scalable financial UIs. Ready for team collaboration.**
