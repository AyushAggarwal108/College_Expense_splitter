"use client"
import "./ExpenseList.css"

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  if (expenses.length === 0) {
    return (
      <div className="expense-list card">
        <h2 className="list-title">Expenses</h2>
        <div className="empty-state">
          <p>No expenses added yet.</p>
          <p>Add your first expense to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="expense-list card">
      <div className="list-header">
        <h2 className="list-title">Expenses</h2>
        <div className="total-amount">Total: ₹{totalAmount.toFixed(2)}</div>
      </div>

      <div className="expenses-container">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-item">
            <div className="expense-main">
              <div className="expense-info">
                <h3 className="expense-title">{expense.title}</h3>
                <div className="expense-details">
                  <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
                  <span className="expense-payer">Paid by {expense.paidBy}</span>
                </div>
                <div className="expense-shared">
                  <span className="shared-label">Shared by:</span>
                  <span className="shared-members">{expense.sharedBy.join(", ")}</span>
                </div>
                {expense.date && <div className="expense-date">Added on {expense.date}</div>}
              </div>

              <button className="delete-btn" onClick={() => onDeleteExpense(expense.id)} title="Delete expense">
                🗑️
              </button>
            </div>

            <div className="expense-split-info">
              <span className="split-amount">₹{(expense.amount / expense.sharedBy.length).toFixed(2)} per person</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExpenseList
