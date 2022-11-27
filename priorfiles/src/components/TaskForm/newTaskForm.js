import React, { useState } from "react";
import { useForm } from "react-hook-form";

export function Form(props) {
    const [taskName, setTaskName] = useState('');
    const {register, formState: {errors}} = useForm();
    // const onSubmit = data => console.log(data);
    console.log(errors);

    function handleSubmit(e) {
        e.preventDefault();
        if (!taskName.trim()) {
            return;
        }
        props.addTask(taskName);
        setTaskName("");
    }
    function handleChange(e) {
        setTaskName(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="new-todo-input"
                autoComplete="off"
                value={taskName}
                onChange={handleChange}
                placeholder="Enter your task here" {...register("new-task-input", {required: true, maxLength: 102})} />
            <select {...register("task-category")}>
                <option value="Learning">Learning</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
            </select>

            <input type="submit" />
        </form>
    );
}