import React from "react";
import {isBooleanObject, isNumberObject} from "node:util/types";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
    period: string
}


type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (task: TaskType) => void

}

export function TodoList(props: PropsType) {

    return (
        <div>
            <h3>{props.title} </h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>

                {
                    props.tasks.map(t =>
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <span>{t.period}</span>
                            <button onClick={() => {
                                console.log(`Ви маєте намір видалити завдання: ${t.title}`);
                                props.removeTask(t.id);
                            }}
                            >x
                            </button>
                        </li>
                    )
                }


            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>

        </div>
    )
}