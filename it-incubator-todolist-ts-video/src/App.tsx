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

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType

}

export function App() {


    // let tasks2: Array<TaskType> = [
    //     {id: 1, title: "CSS", isDone: true, period: " 2025"},
    //     {id: 2, title: "react", isDone: false, period: " 2025"},
    //     {id: 3, title: "node.js", isDone: false, period: " 2025"},
    //     {id: 4, title: "redux", isDone: false, period: " 2025"}
    // ]


    // let arr = useState(initTasks);
    // let tasks = arr[0];
    // let setTask = arr[1];

    // let [tasks1, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "Жалюзі у ванній", isDone: false, period: " 22.02.2025"},
    //     {id: v1(), title: "Штори для пральної", isDone: true, period: " 22.02.2025"},
    //     {id: v1(), title: "Ніжки для умивальника", isDone: true, period: " 22.02.2025"},
    //     {id: v1(), title: "Декорування комунікацій в туалеті", isDone: false, period: " 22.02.2025"}
    //
    // ])


    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj})
    }

    function addTask(currentTitle: string, todolistId: string, period: string) {
        let newTask = {
            id: v1(),
            title: currentTitle,
            isDone: false,
            period: period
        };
        let tasks = tasksObj[todolistId];
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, status: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];

        if (!tasks) {
            console.error(`Tasks list for todolistId ${todolistId} not found!`);
            return;
        }

        let task = tasks.find(t => t.id === taskId);

        if (task) {
            task.isDone = status;
            setTasks({...tasksObj});
            // tasksObj[todolistId]=[...tasksObj]
        } else {
            console.error(`Task with ID ${taskId} not found in todolist ${todolistId}`);
        }


    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "Що зробити ?", filter: "active"},
        {id: todolistId2, title: "Що вивчити ?", filter: "completed"}
    ]);

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "Жалюзі у ванній", isDone: false, period: " 22.02.2025"},
            {id: v1(), title: "Штори для пральної", isDone: true, period: " 22.02.2025"},
            {id: v1(), title: "Ніжки для умивальника", isDone: true, period: " 22.02.2025"},
            {id: v1(), title: "Декорування комунікацій в туалеті", isDone: false, period: " 22.02.2025"}
        ],

        [todolistId2]: [
            {id: v1(), title: "HTML", isDone: false, period: " 22.02.2025"},
            {id: v1(), title: "CSS", isDone: true, period: " 22.02.2025"},
            {id: v1(), title: "JS", isDone: true, period: " 22.02.2025"},
            {id: v1(), title: "React", isDone: false, period: " 22.02.2025"},
            {id: v1(), title: "Redux", isDone: true, period: " 22.02.2025"},
            {id: v1(), title: "Node.js", isDone: true, period: " 22.02.2025"},
            {id: v1(), title: "PGSQL", isDone: false, period: " 22.02.2025"}]
    })

    // if (filter === "active") {
    //     let tasksForTodolist = tasks.filter(t => t.isDone === false)
    // }


    return (
        <div className="App">
            <div className="button-container">
                <input className="task-input"/>
                <button className="add-task-button">+</button>
            </div>
            <div className="todoList-container">
                {
                    todolists.map((tl) => {
                        let tasksForTodolist = tasksObj[tl.id];

                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                        }

                        return (
                            <div className="todo-list" key={tl.id}>
                                <TodoList
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    filter={tl.filter}
                                />
                            </div>
                        );
                    })
                }
            </div>

        </div>
    );
}
