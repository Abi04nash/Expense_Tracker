import { useState } from "react";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);




function ExpenseForm({ task, onBack , onAddExpense, expenses , expense , setExpenses }) {

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  
  

  const handleSubmit = () => {
    if (amount.trim() === "" || description.trim() === "") return;
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return;

    onAddExpense(task.id, {
      id: Date.now(),
      amount: numericAmount,
      description,
    });

    setAmount("");
    setDescription("");
  };


 
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => {
      if (!prevExpenses[task.id]) return prevExpenses; // If no expenses for task, return as is
      return {
        ...prevExpenses,
        [task.id]: prevExpenses[task.id].filter(expense => expense.id !== id),
      };
    });
  };
  
  

  return (
    <div className="expense-form">
    <div className="lefte">
      <h2 className="form-title">Expense For : {task.text}</h2>
      <br />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="form-input"
      />
      <br />
      <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="form-textarea"
      ></textarea>
      <br />
      <div className="btn">
        <button onClick={onBack} className="back-button">Back</button>
      <button onClick={handleSubmit} className="submit-button">Save Expense</button>
      </div>
      </div>

      

      <div className="righte">
   <h3>Total Expenses: ₹{total}</h3>
   <br />
   <br />
   <Bar
     data={{
       labels: expenses.map((exp, index) => `Expense ${index + 1}`),
       datasets: [
         {
           label: "Amount (₹)",
           data: expenses.map((exp) => exp.amount),
           backgroundColor: "rgba(75, 192, 192, 0.6)",
           borderColor: "rgba(75, 192, 192, 1)",
           borderWidth: 1,
         },
       ],
     }}
     options={{
       responsive: true,
       plugins: {
         legend: { display: false },
       },
     }}
   />
</div>


      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            ₹{expense.amount} - {expense.description}

            <button onClick={() => deleteExpense(expense.id)} className="c">❌</button>
          </li>
        ))}
      </ul>

    </div>   
  );
}




export default function Expense() {


  
  const [tasks, setTasks] = useState([]);
  const [expenses, setExpenses] = useState({});
  const [input, setInput] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);


   // Local Storage
  useEffect(() =>{
    const tasks = JSON.parse(localStorage.getItem("tasks"))

    if(tasks && tasks.length > 0){
      setTasks(tasks)
    }
  } , [])

  useEffect(() => {
    localStorage.setItem("tasks" , JSON.stringify(tasks))
  } , [tasks])


  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || {};
    setExpenses(storedExpenses);
  }, []);
  
  useEffect(() => {
    if (expenses) localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  

  const handleTaskClick = (selectedTask) => {
    setSelectedTask(selectedTask);
    localStorage.setItem("selectedTask", JSON.stringify(selectedTask));
  };
  
  const handleBack = () => {
    setSelectedTask(null);
    localStorage.removeItem("selectedTask");
  };
  
  


  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddExpense = (taskId, expense) => {
    setExpenses((prev) => ({
      ...prev,
      [taskId]: [...(prev[taskId] || []), expense],
    }));
  };
  

  
  if (selectedTask) {
    return (
      <ExpenseForm
  task={selectedTask}
  onBack={handleBack}
  onAddExpense={handleAddExpense}
  expenses={expenses[selectedTask.id] || []}
  setExpenses={setExpenses}
/>

    );
  }

  return (
    <div className="expense">
      <br />
      <br />
      <h1 style={{color:"white"}}>Expense Tracker</h1>
      <br />
      <div className="input-section">
        <input
          type="date"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Date"
          className="in"
        />
        <button onClick={addTask} className="add">Add</button>
      </div>
      <ul className="big">
        {tasks.map(task => (
          <li key={task.id} className="small">
            <span
              className={task.completed ? "completed" : ""}
              onClick={() => setSelectedTask(task)}
            >
              {task.text}
            </span>
            
            <button onClick={() => deleteTask(task.id)} className="cross">❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
