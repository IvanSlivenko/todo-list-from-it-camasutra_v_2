import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {isBooleanObject, isNumberObject} from "node:util/types";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    period: string
}


type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (currentTitle: string) => void
    changeTaskStatus: (taskId: string, status: boolean) => void
    filter: FilterValuesType


}

export function TodoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPresHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (newTaskTitle.trim() === "") {
            setError("Field is requared")
            return;
        }

        if (newTaskTitle === "херня") {

            return;
        }

        if (e.key === "Enter") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");

        }
    }


    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Field is requared")
            return;
        }

        if (newTaskTitle === "херня") {
            return;
        }
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
        setError("");
    }


    const onAllClickFilter = () => {
        props.changeFilter("all")
    }

    const onCompletedClickFilter = () => {
        props.changeFilter("completed")
    }

    const onActiveClickFilter = () => {
        props.changeFilter("active")
    }


    return (
        <div>
            <h3>{props.title} </h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChange}
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
                                props.removeTask(t.id);
                            }

                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                // console.log(`буде змінено статус для задання ${t.title} на ${!e.currentTarget.checked}`);
                                props.changeTaskStatus(t.id, e.currentTarget.checked)
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