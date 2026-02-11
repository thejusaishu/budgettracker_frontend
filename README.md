# Budget Tracker - Vue.js + Node.js + PostgreSQL

A full-stack budget tracking application built with Vue.js 3, Node.js, Express, and PostgreSQL.

## Features

- **User Authentication** - Register and login with email/password
- **JWT Tokens** - Secure token-based authentication
- **Add Transactions** - Track income and expenses with categories
- **Dashboard** - View income, expenses, and balance summary
- **Search & Filter** - Find transactions easily
- **Responsive Design** - Works on desktop and mobile

## Tech Stack

### Frontend
- Vue.js 3 (Composition API)
- Vite
- Plain CSS (Scoped styles)

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
budget-tracker/
├── src/                          # Vue.js Frontend
│   ├── api/
│   │   └── index.js              # API calls
│   ├── composables/
│   │   ├── useAuth.js            # Authentication logic
│   │   └── useTransactions.js    # Transactions logic
│   ├── components/
│   │   ├── AuthPage.vue          # Login/Register page
│   │   ├── UserHeader.vue        # Header with user info
│   │   ├── LoadingSpinner.vue    # Loading component
│   │   ├── SummaryCard.vue       # Income/expense cards
│   │   ├── TransactionForm.vue   # Add transaction form
│   │   ├── TransactionList.vue   # List with filters
│   │   └── TransactionItem.vue   # Single transaction
│   ├── App.vue                   # Main app component
│   └── main.js                   # Vue entry point
├── server/                       # Node.js Backend
│   ├── index.js                  # Express server
│   ├── package.json              # Server dependencies
│   └── .env.example              # Environment template
└── README.md
```

## Setup Instructions

### 1. Database Setup

Install PostgreSQL and create a database:

```sql
CREATE DATABASE budget_tracker;
```

### 2. Backend Setup

```bash
# Navigate to server folder
cd server

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://username:password@localhost:5432/budget_tracker
# JWT_SECRET=your-secret-key-here

# Install dependencies
npm install

# Start server
npm run dev
```

The server will start on http://localhost:3000

### 3. Frontend Setup

```bash
# From project root
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:3000/api" > .env

# Start development server
npm run dev
```

The app will open on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Transactions (Protected)
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Add new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

## Vue.js Concepts Demonstrated

1. **Composition API** - `ref`, `reactive`, `computed`, `watch`, `onMounted`
2. **Composables** - Reusable logic with `useAuth` and `useTransactions`
3. **Props & Emits** - Parent-child component communication
4. **v-model** - Two-way data binding
5. **Conditional Rendering** - `v-if`, `v-else`
6. **List Rendering** - `v-for` with `:key`
7. **Event Handling** - `@click`, `@submit.prevent`
8. **Dynamic Classes** - `:class` with objects
9. **Scoped CSS** - Component-specific styling
10. **Lifecycle Hooks** - `onMounted` for initialization

## Screenshots

The application includes:
- Clean login/register page with form validation
- Dashboard with income, expense, and balance cards
- Transaction form with categories and date picker
- Searchable and filterable transaction list
- Responsive design for all screen sizes

## License

MIT
