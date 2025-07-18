export const calculateBalances = (members, expenses) => {
  const memberBalances = {}
  members.forEach((member) => {
    memberBalances[member] = 0
  })

  expenses.forEach((expense) => {
    const { amount, paidBy, sharedBy } = expense
    const sharePerPerson = amount / sharedBy.length

    memberBalances[paidBy] += amount

    sharedBy.forEach((member) => {
      memberBalances[member] -= sharePerPerson
    })
  })

  const creditors = []
  const debtors = []

  Object.entries(memberBalances).forEach(([member, balance]) => {
    if (balance > 0.01) {
      creditors.push({ name: member, amount: balance })
    } else if (balance < -0.01) {
      debtors.push({ name: member, amount: Math.abs(balance) })
    }
  })

  const settlements = []
  let creditorIndex = 0
  let debtorIndex = 0

  while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
    const creditor = creditors[creditorIndex]
    const debtor = debtors[debtorIndex]

    const settlementAmount = Math.min(creditor.amount, debtor.amount)

    if (settlementAmount > 0.01) {
      settlements.push({
        from: debtor.name,
        to: creditor.name,
        amount: settlementAmount,
      })
    }

    creditor.amount -= settlementAmount
    debtor.amount -= settlementAmount

    if (creditor.amount < 0.01) {
      creditorIndex++
    }
    if (debtor.amount < 0.01) {
      debtorIndex++
    }
  }

  return settlements
}

export const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

export const calculateMemberStats = (memberName, expenses) => {
  let totalPaid = 0
  let totalShare = 0
  let expenseCount = 0

  expenses.forEach((expense) => {
    if (expense.paidBy === memberName) {
      totalPaid += expense.amount
    }

    if (expense.sharedBy.includes(memberName)) {
      totalShare += expense.amount / expense.sharedBy.length
      expenseCount++
    }
  })

  return {
    totalPaid,
    totalShare,
    netBalance: totalPaid - totalShare,
    expenseCount,
  }
}
