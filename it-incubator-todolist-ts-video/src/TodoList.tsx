import React from "react";

type PropsType = {
    title: string

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
                <li><input type="checkbox" checked={false}/><span>Жалюзі в ванну </span></li>
                <li><input type="checkbox" checked={false}/><span>Штори для пральної </span></li>
                <li><input type="checkbox" checked={true}/><span>Ніжки для полички під умивальник </span></li>
                <li><input type="checkbox" checked={false}/><span>Полички в комоді </span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>

        </div>
    )
}