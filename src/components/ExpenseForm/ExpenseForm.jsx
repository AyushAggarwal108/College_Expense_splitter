"use client"

import { useState } from "react"
import "./ExpenseForm.css"

const ExpenseForm = ({ members, onAddExpense }) => {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [paidBy, setPaidBy] = useState("")
  const [sharedBy, setSharedBy] = useState([])

  const handleSharedByChange = (member) => {
    if (sharedBy.includes(member)) {
      setSharedBy(sharedBy.filter((m) => m !== member))
    } else {
      setSharedBy([...sharedBy, member])
    }
  }

  const selectAllMembers = () => {
    setSharedBy([...members])
  }

  const clearAllMembers = () => {
    setSharedBy([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title.trim() && amount && paidBy && sharedBy.length > 0) {
      const expense = {
        title: title.trim(),
        amount: Number.parseFloat(amount),
        paidBy,
        sharedBy: [...sharedBy],
      }

      onAddExpense(expense)

      setTitle("")
      setAmount("")
      setPaidBy("")
      setSharedBy([])
    }
  }

  return (
    <div className="expense-form card">
      <h2 className="form-title">Add New Expense</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Expense Title</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., Dinner at restaurant, Movie tickets"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Amount (₹)</label>
          <input
            type="number"
            className="form-input"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Paid By</label>
          <select className="form-input" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} required>
            <option value="">Select who paid</option>
            {members.map((member, index) => (
              <option key={index} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Shared By</label>
          <div className="shared-by-controls">
            <button type="button" className="btn btn-secondary select-all-btn" onClick={selectAllMembers}>
              Select All
            </button>
            <button type="button" className="btn btn-secondary clear-all-btn" onClick={clearAllMembers}>
              Clear All
            </button>
          </div>

          <div className="members-checkbox-grid">
            {members.map((member, index) => (
              <label key={index} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={sharedBy.includes(member)}
                  onChange={() => handleSharedByChange(member)}
                />
                <span className="checkbox-text">{member}</span>
              </label>
            ))}
          </div>

          {sharedBy.length > 0 && (
            <p className="selected-count">
              Selected: {sharedBy.length} member{sharedBy.length > 1 ? "s" : ""}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary submit-btn"
          disabled={!title.trim() || !amount || !paidBy || sharedBy.length === 0}
        >
          Add Expense
        </button>
      </form>
    </div>
  )
}

export default ExpenseForm
