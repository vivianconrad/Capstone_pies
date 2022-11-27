import React from "react";

function FilterCategoryButton(props) {
    return (
        <button
            type="button"
            className="btn toggle-btn"
            aria-pressed={props.isPressed}
            onClick={() => props.setFilter(props.category)}
        >
            <span className="visually-hidden">Show </span>
            <span>{props.category}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    );
}

export default FilterCategoryButton;