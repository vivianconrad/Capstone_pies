import React, { useState, useRef, useEffect } from "react";
import './App.css';

//form imports
import { Form} from "./components/TaskForm/newTaskForm";
import ToDo from "./components/ToDo"
import FilterCompleteButton from "./components/FilterCompleteButton";

//Navigation imports
import Navbar from "./components/navigationBar/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import { nanoid } from "nanoid";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                // use object spread to make a new object
                // whose `completed` prop has been inverted
                return {...task, completed: !task.completed}
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function deleteTask(id) {
        const remainingTasks = tasks.filter(task => id !== task.id);
        setTasks(remainingTasks);
    }

    function editTask(id, newName) {
        const editedTaskList = tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                //
                return {...task, name: newName}
            }
            return task;
        });
        setTasks(editedTaskList);
    }

    const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
            <ToDo
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));

    const filterList = FILTER_NAMES.map(name => (
        <FilterCompleteButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    function addTask(name) {
        const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
        setTasks([...tasks, newTask]);
    }

    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    //    if more than one task: noun is tasks otherwise is task
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    // setting variables for pie chart
    const doneTasks = task => task.completed.length;
    const numOfTasks = taskList.length;

    const listHeadingRef = useRef(null);
    const prevTaskLength = usePrevious(tasks.length);

    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    const onSubmit = data => console.log(data);

  return (
    <div className="App">
        <h1>Smart Form Component</h1>
        <Form addTask={addTask} />

        <div className="filters btn-group stack-exception">
            {filterList}
        </div>
        <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
            {headingText}
        </h2>
        <ul
            role="list"
            className="todo-list stack-large stack-exception"
            aria-labelledby="list-heading"
        >
            {taskList}
        </ul>

        <Router>
            <Navbar />
            <Routes>
                <Route path='/home' component={Home} />
            </Routes>
        </Router>
      {/*<header className="App-header">*/}

      {/*</header>*/}

    </div>
  );
}

export default App;
