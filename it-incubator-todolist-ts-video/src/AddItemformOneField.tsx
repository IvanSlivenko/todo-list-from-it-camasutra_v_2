import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './AddItemformOneField.css';

type AddItemFormPropsType = {
    id: string;
    addTask: (currentTitle: string, todolistId: string, period: string) => void;
}

export function AddItemformOneField(props: AddItemFormPropsType) {
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
            setError("Дата - обов'язкова");
            return;
        }

        props.addTask(newTaskTitle, props.id, newTaskPeriod);
        setNewTaskTitle("");
        setNewTaskPeriod("");
        setError(null);
    };
    return <div className="button-container">
        <div className={`input-group ${error ? "input-group-error" : ""}`}>
            <input
                type="text"
                placeholder="Введіть назву"
                value={newTaskTitle}
                onChange={onNewTitleChange}
                onKeyDown={onKeyPressHandler}
                className={`task-input ${error ? "error" : ""}`}
            />

            {/*<input*/}
            {/*    type="text"*/}
            {/*    placeholder="Введіть дату"*/}
            {/*    value={newTaskPeriod}*/}
            {/*    onChange={onNewPeriodChange}*/}
            {/*    onKeyDown={onKeyPressHandler}*/}
            {/*    className={`task-input ${error ? "error" : ""}`}*/}
            {/*/>*/}

            <button className="add-task-button" onClick={addTask}>+</button>
        </div>

        {error && <div className="error-message">{error}</div>}
    </div>


}