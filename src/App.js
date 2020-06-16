import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Typography from "@material-ui/core/Typography";


function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios.get("https://sdw01flic1.execute-api.eu-west-1.amazonaws.com/dev/tasks")
    .then(response =>{
      console.log(response.data);
      setTodos(response.data);
    })
    .catch(err=>{
      console.log("failed",err);
    });
  },[]) 


  function toggleComplete(id) {
    axios.put(`https://sdw01flic1.execute-api.eu-west-1.amazonaws.com/dev/tasks/{id}`,{status:true})
    .then(response=>{
      const completedTodo = todos.filter(todoItem => {
        if (todoItem.todoId === id) {
          todoItem.status = 1;
        }
        return todos;
      });
      setTodos(completedTodo);

    })
    .catch(err=>{
       console.log("Error in task updation",err);
    });
  };

  function removeTodo(id) {
    axios.delete(`https://sdw01flic1.execute-api.eu-west-1.amazonaws.com/dev/tasks/{id}`)
    .then(response =>{
      console.log("deleted",response);
      const filteredTodo = todos.filter(todoItem => {
        return todoItem.todoId !== id;
      });
      setTodos(filteredTodo); 
    })
    .catch(err =>{
      console.log("API error",err);
    });
    
  };

  return (
    <div className="App">
      <Typography style={{ padding: 16 }} variant="h2">
        Get it Done
      </Typography>
      <TodoForm addTodo={todos} />
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}


export default App;