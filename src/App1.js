import React, { useEffect, useState } from "react";
import ExpensesAlert from "./components2/ExpensesAlert";
import ExpensesList from "./components2/ExpensesList";
import ExpensesForm from "./components2/ExpensesForm";
import { v4 as uuidv4 } from "uuid";
import "./App1.css";

// const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];
function App1() {
  const initialExpenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [] ;
  // const initialExpenses = [
  //   { id: 1, charge: "rent", amount: "1100" },
  //   { id: 2, charge: "payement car", amount: "500" },
  //   { id: 3, charge: "payement house", amount: "3100" },
  // ];
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    console.log('we called use effect')
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const clearItems = () => {
    setExpenses([]);
    handleAlert({
      type: "danger",
      text: "all Item has been deleted successfully",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {

      if (edit) {
        let tempexpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        })
        setExpenses(tempexpenses)
        setEdit(false)
        handleAlert({ type: "success", text: "Item Edited Successfully!" });
      } else {
          setExpenses((prev) => {
          const singleExpense = { id: uuidv4(), charge, amount };
          return [...prev, singleExpense];
        });
        handleAlert({ type: "success", text: "Item Addes Successfully!" });
      }

      
      setCharge("");
      setAmount("");
      
    } else {
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amound has to be bigger than zero`,
      });
    }
  };

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id)
    setExpenses(tempExpenses)
    handleAlert({type:'danger', text:'Item has been deleted successfuly'})
  }

  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id)
    let {charge,amount} = expense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }

  return (
    <>
      {alert.show && <ExpensesAlert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpensesForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpensesList expenses={expenses} clearItems={clearItems} handleDelete={handleDelete} handleEdit={handleEdit} />
      </main>
      <h1>
        Total Spending :
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App1;
