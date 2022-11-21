import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import { v4 as uuidv4 } from "uuid";

// const initialExpenses = [
//   {
//     id: uuidv4(),
//     charge: "rent",
//     amount: 1600,
//   },
//   {
//     id: uuidv4(),
//     charge: "car payement",
//     amount: 400,
//   },
//   {
//     id: uuidv4(),
//     charge: "credit car bill",
//     amount: 1200,
//   },
// ];

//console.log(initialExpenses);
function App() {
  // localStorage.clear()
  const initialExpenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [] ;
  // *************** State Value ****************
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState("");
  // single amount
  const [amount, setAmount] = useState("");
  // alert
  const [alert, setAlert] = useState({ show: false });
  // Edit
  const [edit, setEdit] = useState(false);
  // Edit Item
  const [id, setId] = useState(0);
  // ****************** useEffect *****************
   useEffect(() => {
     console.log('we called use effect')
     localStorage.setItem('expenses', JSON.stringify(expenses))
   }, [expenses])
  // ****************** Functionality *****************
  // handle charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  // handle amount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {

      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} : item
        })
        setExpenses(tempExpenses)
        setEdit(false)
        handleAlert({ type: "success", text: "Item Edited Successfully" });
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        // we can write it like above or like that : const singleExpense = {id:uuidv4(), charge:charge, amount:amount}
        setExpenses((prev) => {
          return [...prev, singleExpense];
        });
        // we can use like above or like below, both epressions are right
        // setExpenses(prev => {
        //   return [...prev, singleExpense]
        // })
        handleAlert({ type: "success", text: "Item Added Successfully" });
      }
      
      setCharge("");
      setAmount("");

      
    } else {
      // handle alert called
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount has to be bigger than Zero `,
      });
    }
  };

  // clear all items
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All Items Deleted Successfully" });
  };

  // handle delete single item
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "Item Deleted Successfully" });
  };
  // handle edit item
  const handleEdit = (id) => {
    let expense = expenses.find(item => item.id === id)
    // let expense = expenses.filter(item => item.id === id)
    let {charge, amount} = expense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
    console.log(expense);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          charge={charge}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          clearItems={clearItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        Total Spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
