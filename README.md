# 💰 College Group Expense Splitter

A modern, beginner-friendly web application that helps college students manage shared group expenses for trips, events, food orders, and more. Built with React and JavaScript using clean, modular code structure.

## 🌟 Features

- **Group Management**: Create groups with custom names and add multiple members
- **Expense Tracking**: Add expenses with title, amount, payer, and participants
- **Smart Calculations**: Automatic equal-split calculations showing who owes whom
- **Minimal Transactions**: Optimized algorithm to minimize the number of settlements needed
- **Data Persistence**: All data automatically saved to localStorage
- **PDF Export**: Generate professional expense reports
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Clean UI**: Modern, intuitive interface with smooth animations

## 🚀 Live Demo

**[View Live Application →](https://collegeexpensesplitter.vercel.app/)**

## 🛠️ Tech Stack

- **Frontend**: React 18 with functional components
- **Styling**: Plain CSS with Flexbox and Grid (no frameworks)
- **Build Tool**: Vite for fast development and building
- **PDF Generation**: jsPDF for expense report exports
- **Storage**: Browser localStorage for data persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.css
│   ├── GroupForm/
│   │   ├── GroupForm.jsx
│   │   └── GroupForm.css
│   ├── ExpenseForm/
│   │   ├── ExpenseForm.jsx
│   │   └── ExpenseForm.css
│   ├── ExpenseList/
│   │   ├── ExpenseList.jsx
│   │   └── ExpenseList.css
│   └── BalanceSummary/
│       ├── BalanceSummary.jsx
│       └── BalanceSummary.css
├── utils/
│   └── calculations.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```


## 📖 How to Use

### 1. Create a Group
- Enter a group name (e.g., "Goa Trip", "Pizza Night")
- Add at least 2 members to the group
- Click "Create Group & Start Splitting"

### 2. Add Expenses
- Fill in expense details (title, amount, who paid)
- Select which members shared the expense
- Click "Add Expense" to save

### 3. View Balances
- See exactly who owes whom and how much
- The app calculates the minimum number of transactions needed
- Export a professional PDF report of all settlements

### 4. Settle Up
- Follow the settlement summary to complete transactions
- Reset all data when you want to start fresh

## 🧮 How the Algorithm Works

The expense splitting uses an optimized algorithm that:

1. **Calculates net balances** for each member (what they paid vs. their share)
2. **Identifies creditors** (people who are owed money) and **debtors** (people who owe money)
3. **Minimizes transactions** by matching the largest debts with credits
4. **Generates settlement instructions** showing exactly who should pay whom

## 🔧 Key Components

### GroupForm
Handles group creation and member management with real-time validation.

### ExpenseForm
Allows users to add new expenses with flexible member selection.

### ExpenseList
Displays all expenses with details and deletion functionality.

### BalanceSummary
Shows settlement calculations and provides PDF export functionality.

### Calculations Utility
Contains the core algorithm for expense splitting and balance calculations.





**Made with ❤️ for college students everywhere**
