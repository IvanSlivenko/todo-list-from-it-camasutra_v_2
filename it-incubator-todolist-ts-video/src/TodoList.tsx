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


}

export function TodoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const onNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPresHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    }

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
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
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>

                {
                    props.tasks.map(t => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id);
                        }
                            return <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <span> Дата завдання: {t.period}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        }
                    )
                }


            </ul>
            <div>
                <button onClick={onAllClickFilter}> All</button>
                <button onClick={onCompletedClickFilter}> Completed</button>
                <button onClick={onActiveClickFilter}> Active</button>
            </div>

        </div>
    )
}