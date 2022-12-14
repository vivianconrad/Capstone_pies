import React, {useState} from "react";
import {useForm} from "react-hook-form";

function Form(props) {
    const [taskName, setTaskName] = useState('');
    // const [taskCategory, setCategory] = useForm();
    const {register, formState: {errors}} = useForm();
    console.log(errors);

    function handleSubmit(e) {
        e.preventDefault();
        if (!taskName.trim()) {
            return;
        }
        props.addTask(taskName);
        // props.addTask(taskCategory);
        setTaskName("");
        // setCategory("");
    }


    function handleChange(e) {
        setTaskName(e.target.value);
        // setCategory(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Enter your task here"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={taskName}
                onChange={handleChange}
            />
            <select
                id="category-input"
                // value={taskCategory}
                // onChange={handleChange}
                >
                <option value="Learning">Learning</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
            </select>
            <select
                id="priority-input"
                // value={taskCategory}
                // onChange={handleChange}
                >
                <option value="priority0">none</option>
                <option value="priority1">❗</option>
                <option value="priority2">❗❗</option>
                <option value="priority3">❗❗❗</option>
            </select>
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}

export default Form;