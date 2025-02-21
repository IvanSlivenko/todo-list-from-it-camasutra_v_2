import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {

    let tasks: Array<TaskType> = [
        {id: 1, title: "Жалюзі у ванній", isDone: false, period: " 22.02.2025"},
        {id: 2, title: "Штори для пральної", isDone: false, period: " 22.02.2025"},
        {id: 3, title: "Ніжки для умивальника", isDone: false, period: " 22.02.2025"},
        {id: 4, title: "Декорування комунікацій в туалеті", isDone: false, period: " 22.02.2025"}

    ]
    // let tasks2: Array<TaskType> = [
    //     {id: 1, title: "CSS", isDone: true, period: " 2025"},
    //     {id: 2, title: "react", isDone: false, period: " 2025"},
    //     {id: 3, title: "node.js", isDone: false, period: " 2025"},
    //     {id: 4, title: "redux", isDone: false, period: " 2025"}
    // ]

    function  removeTask(id: number){
        tasks = tasks.filter((tasks: TaskType) =>{
            return tasks.id !== id;
        })
    }

    return (
        <div className="App">
            <TodoList title="Що зробити ?" tasks={tasks}/>



        </div>
    );
}

export default App;
