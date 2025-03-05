import React, {useState} from "react";
import {FilterValuesType} from "./App";
import "./TodoList.css";
import {AddItemform} from "./AddItemform";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
    period: string;
};

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string, todolistId: string) => void;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (currentTitle: string, todolistId: string, period: string) => void;
    changeTaskStatus: (taskId: string, status: boolean, todolistId: string) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
};

export function TodoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskPeriod, setNewTaskPeriod] = useState("");
    const [error, setError] = useState<string | null>(null);

    const CurrentAddTask = (title: string, period: string )=>{
        props.addTask(title, props.id, period);
    }

    return (
        <div className="todo-list">
            <h3>{props.title}
                <button onClick={() => props.removeTodolist(props.id)}>x</button>
            </h3>

            <AddItemform  addItem={CurrentAddTask}/>
            <ul className="task-list">
                {props.tasks.map(t => (
                    <li key={t.id}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={(e) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)}
                        />
                        <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
                        <span> Дата: {t.period}</span>
                        <button onClick={() => props.removeTask(t.id, props.id)}>x</button>
                    </li>
                ))}
            </ul>
            <div className="filter-buttons">
                <button onClick={() => props.changeFilter("all", props.id)} className={props.filter === "all" ? "active-filter" : ""}>All</button>
                <button onClick={() => props.changeFilter("completed", props.id)} className={props.filter === "completed" ? "active-filter" : ""}>Completed</button>
                <button onClick={() => props.changeFilter("active", props.id)} className={props.filter === "active" ? "active-filter" : ""}>Active</button>
            </div>
        </div>
    );
}

