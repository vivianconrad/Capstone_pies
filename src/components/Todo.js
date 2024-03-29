import React, { useEffect, useRef, useState } from "react";

/**
 * It returns the previous value of the argument passed to it.
 * @param value - The value to be stored in the ref.
 * @returns The previous value of the value passed in.
 */
function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

/**
 * It's a function that takes in props and returns a list item with a form or a div, depending on
 * whether the user is editing the task or not
 * @param props - {
 * @returns The return statement is returning the template that is being used.
 */
export default function Todo(props) {
	const [isEditing, setEditing] = useState(false);
	const [newName, setNewName] = useState("");
	const [newCategory, setCategory] = useState();
	const [newPriority, setPriority] = useState();

	const editFieldRef = useRef(null);
	const editButtonRef = useRef(null);

	const wasEditing = usePrevious(isEditing);

	/**
	 * The function is called when the user types in the input field. The function takes the value of the
	 * input field and sets the state of the newName variable to the value of the input field
	 * @param e - the event object
	 */
	function handleChange(e) {
		setNewName(e.target.value);
		setCategory(e.target.value);
		setPriority(e.target.value);
	}

	/**
	 * The function is called when the user clicks the submit button on the form. It prevents the default
	 * action of the form, which is to refresh the page. It then checks to see if the user has entered a
	 * task name. If not, it returns. If so, it calls the editTask function, which is passed down from the
	 * parent component, and passes in the id of the task, the new name, the new category, and the new
	 * priority. It then sets the newName, newCategory, and newPriority to empty strings, sets editing to
	 * false, and returns.
	 * @param e - event
	 * @returns The return statement is returning the form.
	 */
	function handleSubmit(e) {
		e.preventDefault();
		if (!newName.trim()) {
			return;
		}
		props.editTask(props.id, newName);
		props.editTask(props.category, newCategory);
		props.editTask(props.priority, newPriority);
		setNewName("");
		setCategory("");
		setPriority("");
		setEditing(false);
	}

	function readablePriority(priority) {
		if (priority === "priority1") {
			return "❗";
		}

		if (priority === "priority2") {
			return "❗❗";
		}

		if (priority === "priority3") {
			return "❗❗❗";
		}

		return "";
	}

	const editingTemplate = (
		<form className="stack-small" onSubmit={handleSubmit}>
			<div className="form-group">
				<label className="todo-label" htmlFor={props.id}>
					New name for {props.name}
				</label>
				<input
					id={props.id}
					className="todo-text"
					type="text"
					value={newName || props.name}
					onChange={handleChange}
					ref={editFieldRef}
				/>
				<select
					className="todo-text"
					value={newCategory || props.category}
					onChange={handleChange}
					ref={editFieldRef}
				>
					<option value="Learning">Learning</option>
					<option value="Personal">Personal</option>
					<option value="Work">Work</option>
				</select>
			</div>
			<div className="btn-group">
				<button
					type="button"
					className="btn todo-cancel"
					onClick={() => setEditing(false)}
				>
					Cancel
					<span className="visually-hidden">renaming {props.name}</span>
				</button>
				<button
					type="submit"
					className="btn btn__primary todo-edit"
					onClick={() => setEditing(false)}
				>
					Save
					<span className="visually-hidden">new name for {props.name}</span>
				</button>
			</div>
		</form>
	);

	const viewTemplate = (
		<div className="stack-small">
			<div className="c-checkbox">
				<input
					id={props.id}
					type="checkbox"
					defaultChecked={props.completed}
					onChange={() => props.toggleTaskCompleted(props.id)}
				/>
				<label className="todo-label" htmlFor={props.id}>
					{props.name}
				</label>
				<label className="todo-label">{props.category}</label>
				<label className="todo-label">{readablePriority(props.priority)}</label>
			</div>
			<div className="btn-group">
				<button
					type="button"
					className="btn"
					onClick={() => setEditing(true)}
					ref={editButtonRef}
				>
					Edit <span className="visually-hidden">{props.name}</span>
				</button>
				<button
					type="button"
					className="btn btn__danger"
					onClick={() => props.deleteTask(props.id)}
				>
					Delete <span className="visually-hidden">{props.name}</span>
				</button>
			</div>
		</div>
	);

	useEffect(() => {
		if (!wasEditing && isEditing) {
			editFieldRef.current.focus();
		}
		if (wasEditing && !isEditing) {
			editButtonRef.current.focus();
		}
	}, [wasEditing, isEditing]);

	return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
