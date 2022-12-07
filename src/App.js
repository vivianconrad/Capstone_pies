import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import "./css/index.css";

/* Importing the components from the components folder. */
import Form from "./components/Form";
import FilterCompleteButton from "./components/buttons/FilterCompleteButton";
import FilterCategoryButton from "./components/buttons/FilterCategoryButton";
import Todo from "./components/Todo";
import { StateMachineProvider, createStore } from "little-state-machine";

//navigation imports
import Navbar from "./components/navigationBar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { useForm } from "react-hook-form";

import { PieChart, Pie } from "recharts";

import { button, card, form } from "react-bootstrap";

// const possiblePriorities = ["priority0", "priority1", "priority2", "priority3"];

/* Setting the initial state of the app. */
const DATA = [
	{
		id: "todo-0",
		name: "Homework",
		completed: true,
		category: "Learning",
		priority: "priority0",
	},
	{
		id: "todo-1",
		name: "Take out the trash",
		completed: false,
		category: "Personal",
		priority: "priority2",
	},
	{
		id: "todo-2",
		name: "Create Powerpoint",
		completed: true,
		category: "Work",
		priority: "priority1",
	},
	{
		id: "todo-3",
		name: "Buy more dog food",
		completed: true,
		category: "Personal",
		priority: "priority3",
	},
	{
		id: "todo-4",
		name: "Get groceries",
		completed: false,
		category: "Personal",
		priority: "priority2",
	},
];

// localStorage.setItem("tasks", JSON.stringify(DATA));

sessionStorage.setItem("taskStackAlreadyAnimated", false);

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

/* Creating a filter map that is used to filter the tasks by completion. */
const FILTER_MAP = {
	All: () => true,
	Active: (task) => !task.completed,
	Completed: (task) => task.completed,
};

/* Creating a filter map that is used to filter the tasks by category. */
const FILTER_MAP2 = {
	All: () => true,
	Learning: (task) => task.category === "Learning",
	Work: (task) => task.category === "Work",
	Personal: (task) => task.category === "Personal",
};

const FILTER_NAMES = Object.keys(FILTER_MAP);
const FILTER_CATEGORY = Object.keys(FILTER_MAP2);

function App(props) {
	/* Using the useState hook to set the tasks and filter state. It is also using the useForm hook to
    register the form and handle the submit. */
	// const [tasks, setTasks, setCategory] = useState(props.tasks);

	const [filter, setFilter] = useState("All");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => console.log(data);

    function setTasks(updatedTasks){
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

	/**
	 * "If the task has the same ID as the edited task, use object spread to make a new object whose
	 * `completed` prop has been inverted."
	 *
	 * Let's break that down.
	 *
	 * First, we're using the `map` array method to create a new array of tasks.
	 *
	 * Next, we're using object spread to create a new object.
	 *
	 * Finally, we're inverting the `completed` property.
	 *
	 * Let's look at each of these steps in more detail.
	 * @param id - the ID of the task to toggle
	 */
	function toggleTaskCompleted(id) {
		const updatedTasks = JSON.parse(localStorage.getItem("tasks")).map((task) => {
			// if this task has the same ID as the edited task
			if (id === task.id) {
				// use object spread to make a new object
				// whose `completed` prop has been inverted
				return { ...task, completed: !task.completed };
			}
			return task;
		});
		setTasks(updatedTasks);
	}

	/**
	 * The deleteTask function takes in an id, filters out the task with that id, and sets the remaining
	 * tasks to the state.
	 * @param id - The id of the task to be deleted
	 */
	function deleteTask(id) {
		const remainingTasks = JSON.parse(localStorage.getItem("tasks")).filter((task) => id !== task.id);
		setTasks(remainingTasks);
	}

	/**
	 * If the task has the same ID as the edited task, return a new object with the same properties as the
	 * task, but with the name and category properties updated to the new values.
	 *
	 * If the task doesn't have the same ID as the edited task, return the task as is.
	 *
	 * The ...task syntax is called the spread operator. It's a way to copy all of the properties of an
	 * object into a new object.
	 *
	 * The map() method is a way to loop through an array and return a new array with the same number of
	 * items.
	 *
	 * The editedTaskList variable is the new array that map() returns.
	 *
	 * The setTasks() function is a React hook that updates the tasks state variable.
	 *
	 * The setTasks() function is a React hook that updates the tasks state variable.
	 *
	 * The setTasks() function is a React hook
	 * @param id - the id of the task to be edited
	 * @param newName - the new name of the task
	 * @param newCategory - the new category that the user has selected
	 */
	function editTask(id, newName, newCategory) {
        console.log("WOW");
		let editedTaskList = JSON.parse(localStorage.getItem("tasks"));
        editedTaskList.array.forEach((element, index) => {
            console.log("cool: " + element);
        });
        // .map((task) => {
		// 	// if this task has the same ID as the edited task
		// 	if (id === task.id) {
		// 		//
		// 		return { ...task, name: newName, category: newCategory };
		// 	}
		// 	return task;
		// });
		setTasks(editedTaskList);
	}

	/* Creating a list of tasks that are filtered by the filter map. */
	let taskList = JSON.parse(localStorage.getItem("tasks"))
		.filter(FILTER_MAP[filter])
		.map((task) => (
			<Todo
				id={task.id}
				name={task.name}
				completed={task.completed}
				category={task.category}
				priority={task.priority}
				key={task.id}
				toggleTaskCompleted={toggleTaskCompleted}
				deleteTask={deleteTask}
				editTask={editTask}
			/>
		));

	/* Creating a list of buttons that are used to filter the tasks by completion. */
	const filterList = FILTER_NAMES.map((name) => (
		<FilterCompleteButton
			key={name}
			name={name}
			isPressed={name === filter}
			setFilter={setFilter}
		/>
	));

	/* Creating a list of buttons that are used to filter the tasks by category. */
	const filterCategoryList = FILTER_CATEGORY.map((category) => (
		<FilterCategoryButton
			category={category}
			isPressed={category === filter}
			setFilter={setFilter}
		/>
	));

	/**
	 * The addTask function takes two arguments, name and category, and creates a new task object with the
	 * name and category properties set to the values of the arguments, and the completed property set to
	 * false. It then adds the new task object to the tasks array.
	 * @param name - the name of the task
	 * @param category - the category that the task is in
	 */
	function addTask(name, category = "Learning") {
		const newTask = {
			id: "todo-" + nanoid(),
			name: name,
			completed: false,
			category: document.getElementById("category-input").value,
            priority: "priority0"
		};
		setTasks([...JSON.parse(localStorage.getItem("tasks")), newTask]);
	}

	/* This is a ternary operator. It is saying if the taskList.length is not equal to 1, then the
    tasksNoun is tasks, otherwise it is task. The headingText is saying that the headingText is the
    taskList.length and the tasksNoun. The listHeadingRef is a reference to the list heading. The
    prevTaskLength is the previous task length. */
	const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
	//    if more than one task: noun is tasks otherwise is task
	const headingText = `${taskList.length} ${tasksNoun} remaining`;

	const listHeadingRef = useRef(null);
	const prevTaskLength = usePrevious(JSON.parse(localStorage.getItem("tasks")).length);

	/* Saying if the taskList.length is not equal to 1, then the tasksNoun is tasks, otherwise it is task.
    The headingText is saying that the headingText is the taskList.length and the tasksNoun. The
    listHeadingRef is a reference to the list heading. The prevTaskLength is the previous task length. */
	useEffect(() => {
		if (JSON.parse(localStorage.getItem("tasks")).length - prevTaskLength === -1) {
			listHeadingRef.current.focus();
		}
	}, [JSON.parse(localStorage.getItem("tasks")).length, prevTaskLength]);

	// setting variables for pie chart
	const doneTasks = 4;
	const numOfTasks = taskList.length;

	const data = [
		// data for pie chart
		{ name: "completed", count: doneTasks },
		{ name: "incomplete", count: numOfTasks },
	];

	/* Returning the HTML code. */
	return (
		<div className="todoapp">
			<h1>Hello Yolanda</h1>
			<PieChart width={350} height={250}>
				{/* creating pie chart of tasks */}
				<Pie data={data} dataKey="count" fill="green" label />
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
				<Form addTask={addTask} />
			</card>
		</div>
	);
}

export default App;
