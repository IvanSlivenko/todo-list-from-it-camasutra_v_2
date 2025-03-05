import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import "./AddItemform.css";

type AddItemFormPropsType = {
    addItem: (currentTitle: string,  period: string) => void;
}

export function AddItemform(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [newTaskPeriod, setNewTaskPeriod] = useState("");

    const onNewTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onNewPeriodChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskPeriod(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() === "" || newTaskPeriod.trim() === "") {
            setError("Поля: Назва, Дата - обов'язкові");
            return;
        }

        props.addItem(newTaskTitle, newTaskPeriod);
        setNewTaskTitle("");
        setNewTaskPeriod("");
        setError(null);
    };
    return <div>
        <input
            type="text"
            placeholder="Введіть назву"
            value={newTaskTitle}
            onChange={onNewTitleChange}
            onKeyDown={onKeyPressHandler}
            className={error ? "error" : "task-input"}
        />

        <input
            type="text"
            placeholder="Введіть дату"
            value={newTaskPeriod}
            onChange={onNewPeriodChange}
            onKeyDown={onKeyPressHandler}
            className={error ? "error" : "task-input"}
        />
        {error && <div className="error-message">{error}</div>}
        <button className="add-task-button" onClick={addTask}>+</button>

    </div>
}