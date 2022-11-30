//trying to make task.html into a react component
import React from 'react';
import "../../css/taskWeights.css"

const Home = () => {
    return (
        <div className="weights-content-wrapper">
            <div id="weights"></div>
            <div id="weight_tray">
                <div id="cat1Bar"></div>
                <div id="cat2Bar"></div>
                <div id="cat3Bar"></div>
            </div>

        </div>
    < !--[
    if lt IE
    7
]>
<
    p
    className = "browsehappy" > You
    are
    using
    an < strong > outdated < /strong> browser. Please <a href="#">upgrade your browser</
    a > to
    improve
    your
    experience.
</p>
    <![endif]-- >
    < script
    src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.js" > < /script>

        <!-- <div className="fullHeightLimitWidth"></div>-- >
    < div
    id = "flex_weights_container" >
        < div
    id = "flex_weights_subcontainer" >
        < div
    id = "weights" > < /div>
    <div id="weight_tray">
        <div id="cat1Bar"></div>
        <div id="cat2Bar"></div>
        <div id="cat3Bar"></div>
    </div>
    <div id="face"></div>
</div>
</div>

    <div style="position: fixed; bottom:0;">
        <div>
            <select title="categorySelectorDemo" name="categorySelectorDemo"
                    id="categorySelectorDemo">
                <option value=".cat1">cat1</option>
                <option value=".cat2">cat2</option>
                <option value=".cat3">cat3</option>
            </select>
            <select title="prioritySelectorDemo" name="prioritySelectorDemo"
                    id="prioritySelectorDemo">
                <option value=".priority0">none</option>
                <option value=".priority1">❗</option>
                <option value=".priority2">❗❗</option>
                <option value=".priority3">❗❗❗</option>
            </select>
            <button type="button"
                    onclick="removeLastWeightOfClass($('#categorySelectorDemo').val() + $('#prioritySelectorDemo').val());">Remove
                Weight
            </button>
            <button type="button" onclick="removeEveryWeight();">Remove ALL Weights</button>
            <button type="button" onclick="removeCompletedWeights();">Remove completed Weights
            </button>
            <button type="button"
                    onclick="createWeightOfClass($('#categorySelectorDemo').val(), $('#prioritySelectorDemo').val(), true);">Create
                Weight
            </button>
        </div>
        <div>
            <input type="number" name="numberToAdd" id="numberToAdd" value=30>
            <button type="button" onclick="DEBUGaddRandomWeights();">Add N Random
                Weights</button>
        </div>
    </div>

    <script src="removeWeights.js"></script>
        <!-- <div className="weight cat1 priority0"></div>
    <div className="weight cat1 priority0"></div>
    <div className="weight cat1 priority0"></div>
    <div className="weight cat1 priority0"></div>
    <div className="weight cat1 priority0"></div>
    <div className="weight cat1 priority0"></div>
    <div className="weight cat1 priority0"></div>
    <div className="weight cat1 priority0"></div>
    <div className="weight cat1 priority0"></div>
    <div className="weight cat1 priority1"></div>-- >
    < !--<div className="weight_div"></div>-- >
    < !--<div className="weight cat2 priority0"></div>
    <div className="weight cat2 priority0"></div>
    <div className="weight cat2 priority0"></div>
    <div className="weight cat2 priority1"></div>
    <div className="weight cat2 priority2"></div>
    <div className="weight cat2 priority2"></div>-- >
    < !--<div className="weight_div"></div>-- >
    < !--<div className="weight cat3 priority0 completed-weight"></div>
    <div className="weight cat3 priority0"></div>
    <div className="weight cat3 priority0"></div>
    <div className="weight cat3 priority0"></div>
    <div className="weight cat3 priority0"></div>
    <div className="weight cat3 priority0"></div>
    <div className="weight cat3 priority0"></div>
    <div className="weight cat3 priority1"></div>
    <div className="weight cat3 priority1"></div>
    <div className="weight cat3 priority2"></div>
    <div className="weight cat3 priority3"></div>-- >

)
    ;
};