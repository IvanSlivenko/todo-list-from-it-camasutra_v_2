import React from "react";
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
    addTask: () => void


}

export function TodoList(props: PropsType) {

    return (
        <div>
            <h3>{props.title} </h3>
            <div>
                <input/>
                <button onClick={() => props.addTask()}
                >+
                </button>
            </div>
            <ul>

                {
                    props.tasks.map(t =>
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <span> Дата завдання: {t.period}</span>
                            <button onClick={() => {
                                // console.log(`Ви маєте намір видалити завдання: ${t.title}`);
                                props.removeTask(t.id);
                            }}
                            >x
                            </button>
                        </li>
                    )
                }


            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter("all")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter("completed")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter("active")
                }}>Completed
                </button>
            </div>

        </div>
    )
}