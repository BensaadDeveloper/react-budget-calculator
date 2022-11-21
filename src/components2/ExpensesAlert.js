import React from 'react'

const ExpensesAlert = ({type,text}) => {
  return (
    <div className={`alert alert-${type}`}>{text}</div>
  )
}

export default ExpensesAlert