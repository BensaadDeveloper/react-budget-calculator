import React from 'react'
import {MdEdit, MdDelete} from 'react-icons/md'

const ExpensesItem = ({expense, handleDelete, handleEdit}) => {
  const {id,charge,amount} = expense
  return (
    <li className='item'>
      <div className='info'>
        <span className='charge'>{charge}</span>
        <span className='amount'>{amount}</span>
      </div>
      <div>
          <button className='edit-btn' aria-label='Edit Button' onClick={() => handleEdit(id)}>
            <MdEdit />
          </button>
          <button className='clear-btn' aria-label='Clear Button' onClick={() => handleDelete(id)}>
            <MdDelete />
          </button>
      </div>
    </li>
  )
}

export default ExpensesItem