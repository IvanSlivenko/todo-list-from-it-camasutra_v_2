import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {

    let tasks1 = [
        {id: 1, title:"Жалюзі у ванній", isDone: false},
        {id: 2, title:"Штори для пралбної", isDone: false},
        {id: 3, title:"Ніжки для увивальника", isDone: false}
    ]
    let tasks2 = [
        {id: 1, title:"CSS", isDone: true},
        {id: 2, title:"react", isDone: false},
        {id: 3, title:"redux", isDone: false}
    ]

    return (
        <div className="App">
            <TodoList title="Що зробити ?" tasks={tasks1} />
            <TodoList title="Що вивчити ?" tasks={tasks2} />


        </div>
    );
}

export default App;
