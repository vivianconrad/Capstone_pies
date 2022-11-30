import React, {useState, useRef, useEffect} from "react";
import {nanoid} from "nanoid";
import "./css/index.css";

//form imports
import Form from "./components/Form"
import FilterCompleteButton from "./components/buttons/FilterCompleteButton";
import FilterCategoryButton from "./components/buttons/FilterCategoryButton";
import Todo from "./components/Todo";
import {StateMachineProvider, createStore} from "little-state-machine";

//navigation imports
import Navbar from "./components/navigationBar/Navbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/home";
import {useForm} from "react-hook-form";

import {PieChart, Pie} from 'recharts';

import {button, card, form} from 'react-bootstrap';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

// createStore({
//     data: {
//         taskName: '',
//         taskCategory: '',
//     }
// });

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
};

const FILTER_MAP2 = {
    All: () => true,
    Learning: task => task.category === "Learning",
    Work: task => task.category === "Work",
    Personal: task => task.category === "Personal",
};

const FILTER_NAMES = Object.keys(FILTER_MAP);
const FILTER_CATEGORY = Object.keys(FILTER_MAP2);


function App(props) {
    const [tasks, setTasks, setCategory] = useState(props.tasks);
    const [filter, setFilter] = useState('All');
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => console.log(data);

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

    function editTask(id, newName, newCategory) {
        const editedTaskList = tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                //
                return {...task, name: newName, category: newCategory}
            }
            return task;
        });
        setTasks(editedTaskList);
    }

    const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
        <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            category={task.category}
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

    const filterCategoryList = FILTER_CATEGORY.map(category => (
        <FilterCategoryButton
            category={category}
            isPressed={category === filter}
            setFilter={setFilter}
        />
    ));

    function addTask(name, category) {
        const newTask = {id: "todo-" + nanoid(), name: name, completed: false, category: category};
        setTasks([...tasks, newTask]);
    }

    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    //    if more than one task: noun is tasks otherwise is task
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    const listHeadingRef = useRef(null);
    const prevTaskLength = usePrevious(tasks.length);

    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    // setting variables for pie chart
    const doneTasks = 4;
    const numOfTasks = taskList.length;

    const data = [
        // data for pie chart
        {name: 'completed', count: doneTasks},
        {name: 'incomplete', count: numOfTasks},
    ]

    return (
        <div className="todoapp">
            <h1>Hello Yolanda</h1>
            <PieChart width={350} height={250}>
                {/* creating pie chart of tasks */}
                <Pie data={data} dataKey="count" fill="green" label/>
            </PieChart>
            <div className="filters btn-group stack-exception">
                {/* adding filter of all, active, completed*/}
                {filterList}
            </div>
            <div className="filters btn-group stack-exception">
                {filterCategoryList}
            </div>
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                {/* says how many tasks remaining */}
                {headingText}
            </h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
            <card>
                <Form addTask={addTask}/>
            </card>
            <card>
                <Router>
                    <Navbar/>
                    <Routes>
                        <Route path='/pages/home' component={Home}/>
                        <Route path='/pages/home' component={Home}/>
                        <Route path='/pages/home' component={Home}/>
                    </Routes>
                </Router>
            </card>
        </div>
    );
}

export default App;