import React from "react";
import {MdSend} from 'react-icons/md'

const ExpensesForm = ({charge, amount, handleCharge, handleAmount, handleSubmit}) => {
  return (
    <form>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge"></label>
          <input
            id="charge"
            className="form-control"
            placeholder="e.g. rent"
            name="charge"
            type="text"
            onChange={handleCharge}
            value={charge}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount"></label>
          <input
            id="amount"
            className="form-control"
            placeholder="e.g. 200"
            name="amount"
            type="number"
            onChange={handleAmount}
            value={amount}
          />
        </div>
      </div>
      <button type="submit" className="btn" onClick={handleSubmit}>
        Submit
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpensesForm;
