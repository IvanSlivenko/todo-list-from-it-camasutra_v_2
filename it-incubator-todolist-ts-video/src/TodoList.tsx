import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {isBooleanObject, isNumberObject} from "node:util/types";
import {FilterValuesType} from "./App";
import {log} from "node:util";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    period: string
}


type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, todolistId: string) => void,
    changeFilter: (value: FilterValuesType, todolistId: string) => void,
    addTask: (currentTitle: string, todolistId: string, period: string) => void
    changeTaskStatus: (taskId: string, status: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string ) => void


}

export function TodoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskPeriod, setNewTaskPeriod] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onNewPeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskPeriod(e.currentTarget.value)
    }

    const onKeyPresHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (newTaskTitle.trim() === "" && newTaskPeriod.trim() === "") {
            setError("Назва та Виконати до - обов'язкові")
            return;
        }

        if (newTaskTitle === "херня") {

            return;
        }


        if (e.key === "Enter") {
            props.addTask(newTaskTitle, props.id, newTaskPeriod);
            setNewTaskTitle("");
            setNewTaskPeriod("");

        }
    }


    const addTask = () => {
        if (newTaskTitle.trim() === "" ||  newTaskPeriod.trim() === "") {
            setError("Назва та Виконати до - обов'язкові")
            return;
        }

        if (newTaskTitle === "херня") {
            return;
        }

        props.addTask(newTaskTitle, props.id, newTaskPeriod);
        setNewTaskTitle("");
        setError("");
        setNewTaskPeriod("");
    }


    const onAllClickFilter = () => {
        props.changeFilter("all", props.id)
    }

    const onCompletedClickFilter = () => {
        props.changeFilter("completed", props.id)
    }

    const onActiveClickFilter = () => {
        props.changeFilter("active", props.id)
    }

    const removeTodolist=(title: string)=>{
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={()=>removeTodolist(props.title)} >x</button> </h3>
            <div>

                <label htmlFor="taskTitle">Назва завдання:</label>
                <input
                    id="taskTitle"
                    type="text"
                    placeholder="Введіть назву"
                    value={newTaskTitle}
                    onChange={onNewTitleChange}
                    onKeyDown={onKeyPresHandler}
                    className={error ? "error" : ""}
                />
                <label htmlFor="taskPeriod">Виконати до:</label>
                <input
                    id="taskPeriod"
                    type="text"
                    placeholder="Введіть дату готовності"
                    value={newTaskPeriod}
                    onChange={onNewPeriodChange}
                    onKeyDown={onKeyPresHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>

                {
                    props.tasks.map(t => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id);
                        }

                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                // console.log(`буде змінено статус для задання ${t.title} на ${!e.currentTarget.checked}`);
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            return <li key={t.id}>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={onChangeHandler}
                                />
                                <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
                                <span> Дата завдання: {t.period}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        }
                    )
                }


            </ul>
            <div>
                <button onClick={onAllClickFilter} className={props.filter === "all" ? "active-filter" : ""}> All
                </button>
                <button onClick={onCompletedClickFilter}
                        className={props.filter === "completed" ? "active-filter" : ""}> Completed
                </button>
                <button onClick={onActiveClickFilter}
                        className={props.filter === "active" ? "active-filter" : ""}> Active
                </button>
            </div>

        </div>
    )
}