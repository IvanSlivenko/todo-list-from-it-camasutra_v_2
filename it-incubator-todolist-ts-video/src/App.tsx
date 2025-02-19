import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {

    return (
        <div className="App">
            <TodoList title="Що зробити ?" />
            <TodoList title="Що  вивчити ?" />
            <TodoList title="Куди поїхати ?" />
            <input type="checkbox"/>
            <input type="date" />
            <input type="text" placeholder="it-incubator"/>

        </div>
    );
}

export default App;
