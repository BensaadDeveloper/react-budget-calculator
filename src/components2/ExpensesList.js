import React from 'react'
import ExpensesItem from './ExpensesItem'
import {MdDelete} from 'react-icons/md'

const ExpensesList = ({expenses, clearItems, handleDelete, handleEdit}) => {
  return (
    <>
      <ul className='list'>
        {expenses.map(expense => {
          return <ExpensesItem key={expense.id} expense={expense} handleDelete={handleDelete} handleEdit={handleEdit} />
        })}
      </ul>
      {expenses.length > 0 &&       
                          <button className='btn' onClick={clearItems}>
                            Clear Expenses
                            <MdDelete className='btn-icon' />
                          </button>}
    </>
  )
}

export default ExpensesList