"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header/Header"
import GroupForm from "./components/GroupForm/GroupForm"
import ExpenseForm from "./components/ExpenseForm/ExpenseForm"
import ExpenseList from "./components/ExpenseList/ExpenseList"
import BalanceSummary from "./components/BalanceSummary/BalanceSummary"
import { calculateBalances } from "./utils/calculations"
import "./App.css"

function App() {
  const [groupName, setGroupName] = useState("")
  const [members, setMembers] = useState([])
  const [expenses, setExpenses] = useState([])
  const [balances, setBalances] = useState([])

  useEffect(() => {
    const savedData = localStorage.getItem("expenseSplitterData")
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setGroupName(parsedData.groupName || "")
      setMembers(parsedData.members || [])
      setExpenses(parsedData.expenses || [])
    }
  }, [])

  useEffect(() => {
    const dataToSave = {
      groupName,
      members,
      expenses,
    }
    localStorage.setItem("expenseSplitterData", JSON.stringify(dataToSave))
  }, [groupName, members, expenses])

  useEffect(() => {
    if (members.length > 0 && expenses.length > 0) {
      const calculatedBalances = calculateBalances(members, expenses)
      setBalances(calculatedBalances)
    } else {
      setBalances([])
    }
  }, [members, expenses])

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    }
    setExpenses([...expenses, newExpense])
  }

  const deleteExpense = (expenseId) => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseId))
  }

  const resetData = () => {
    if (window.confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      setGroupName("")
      setMembers([])
      setExpenses([])
      setBalances([])
      localStorage.removeItem("expenseSplitterData")
    }
  }

  return (
    <div className="App">
      <Header />

      <main className="container">
        {!groupName && <GroupForm onGroupCreate={setGroupName} onMembersAdd={setMembers} />}

        {groupName && (
          <>
            <div className="group-info card">
              <h2>Group: {groupName}</h2>
              <p>Members: {members.join(", ")}</p>
              <button className="btn btn-danger" onClick={resetData}>
                Reset All Data
              </button>
            </div>

            <div className="app-content">
              <ExpenseForm members={members} onAddExpense={addExpense} />
              <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
              <BalanceSummary balances={balances} groupName={groupName} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App
