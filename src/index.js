import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';


const DATA = [
    { id: "todo-0", name: "Eat", completed: true, category: "Personal"},
    { id: "todo-1", name: "Sleep", completed: false, category: "Learning" },
    { id: "todo-2", name: "Repeat", completed: false, category: "Work" }
];

ReactDOM.render(
    <React.StrictMode>
        <App tasks={DATA} />
    </React.StrictMode>,
    document.getElementById('root')
);