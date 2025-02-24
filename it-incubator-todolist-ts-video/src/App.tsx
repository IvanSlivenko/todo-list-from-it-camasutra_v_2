import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

export function Counter() {
    // let arr = useState(5);
    // let data = arr[0]
    // let setData = arr[1]
    let[data, setData] = useState(5)
    return (
        <div>
            <button
                onClick={() => {
                    setData(data + 1)
                }}> {data}
            </button>
        </div>
    )
}

function App() {


    // let tasks2: Array<TaskType> = [
    //     {id: 1, title: "CSS", isDone: true, period: " 2025"},
    //     {id: 2, title: "react", isDone: false, period: " 2025"},
    //     {id: 3, title: "node.js", isDone: false, period: " 2025"},
    //     {id: 4, title: "redux", isDone: false, period: " 2025"}
    // ]


    // let arr = useState(initTasks);
    // let tasks = arr[0];
    // let setTask = arr[1];

    let [tasks, setTasks] = useState([
        {id: 1, title: "Жалюзі у ванній", isDone: false, period: " 22.02.2025"},
        {id: 2, title: "Штори для пральної", isDone: false, period: " 22.02.2025"},
        {id: 3, title: "Ніжки для умивальника", isDone: false, period: " 22.02.2025"},
        {id: 4, title: "Декорування комунікацій в туалеті", isDone: false, period: " 22.02.2025"}

    ])
    let [filter, setFilter] = useState("active");



    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    let tasksForTofdolist= tasks;
    if(filter === "completed"){
        tasksForTofdolist=tasks.filter(t=> t.isDone === true)
    }
    if(filter === "active"){
        tasksForTofdolist=tasks.filter(t=> t.isDone === false)
    }




    return (
        <div className="App">
            <TodoList
                title="Що зробити ?"
                tasks={tasksForTofdolist}
                removeTask={removeTask}
            />


        </div>
    );
}

export default App;
