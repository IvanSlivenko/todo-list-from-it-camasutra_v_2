import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid';

export function Counter() {
    // let arr = useState(5);
    // let data = arr[0]
    // let setData = arr[1]
    let [data, setData] = useState(5)
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

export  type FilterValuesType = "all" | "completed" | "active";

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

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "Жалюзі у ванній", isDone: false, period: " 22.02.2025"},
        {id: v1(), title: "Штори для пральної", isDone: true, period: " 22.02.2025"},
        {id: v1(), title: "Ніжки для умивальника", isDone: true, period: " 22.02.2025"},
        {id: v1(), title: "Декорування комунікацій в туалеті", isDone: false, period: " 22.02.2025"}

    ])

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function addTask(currentTitle: string) {
        let newTask = {
            id: v1(),
            title: currentTitle,
            isDone: false,
            period: "25.02.2025"
        };
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, status: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = status;
        }
        setTasks([...tasks]);

    }


    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }


    return (
        <div className="App">
            <TodoList
                title="Що зробити ?"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}


            />


        </div>
    );
}

export default App;
