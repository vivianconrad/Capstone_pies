import React, {Component} from 'react';
import './stack.css';
import $, { event } from 'jquery'
import { func } from 'prop-types';

const possibleCat = ["cat1", "cat2", "cat3"];
const possiblePriorities = ["priority0", "priority1", "priority2", "priority3"];
const minFaceSize = .10;
const tasksAtMaxFaceSquish = 100;

let weightDeleteTimeout = Promise;

let numCat1 = 0;
let numCat2 = 0;
let numCat3 = 0;

export default class Stack extends Component{
    // addOneCoin = () => {
    //     let coins = localStorage.getItem("coins");
    //     coins++;
    //     localStorage.setItem('coins', coins);
    //     // alert(localStorage.getItem("coins"));
    // };

    // addCoins = (coinsToAdd) => {
    //     let coins = localStorage.getItem("coins");
    //     coins += coinsToAdd;
    //     localStorage.setItem('coins', coins);
    //     // alert(localStorage.getItem("coins"));
    // };

    componentDidMount() {
        function addCoins(coinsToAdd){
            let coins = parseInt(localStorage.getItem("coins"));
            console.log(coins);
            coins += coinsToAdd;
            localStorage.setItem('coins', coins);
            console.log(coins);

            // alert(localStorage.getItem("coins"));
        };

        function respaceWeights() {
            $(".weight.new-weight.moved-weight").removeClass("new-weight");
            $(".weight").removeClass("moved-weight");
            
        
            clearTimeout(weightDeleteTimeout);
            weightDeleteTimeout = setTimeout(respaceWeightsPartTwo, 1500);

            updateBar();
        };
        
        function respaceWeightsPartTwo() {

            let coinsEarned = $(".completed-weight.priority0").length;
            coinsEarned += $(".completed-weight.priority1").length * 2;
            coinsEarned += $(".completed-weight.priority2").length * 4;
            coinsEarned += $(".completed-weight.priority3").length * 16;
        
            addCoins(coinsEarned);

            const weightsToRemove = $(".removed-weight");
            const numOfWeightsRemoved = weightsToRemove.length;
            // console.log(numOfWeightsRemoved);
            weightsToRemove.remove();
        
            const weightsWereMoved = sortAllWeights();
            if (weightsWereMoved || numOfWeightsRemoved > 0) {
                $(".weight").addClass("moved-weight");
            }
        
            if (coinsEarned > 0) {
                // alert("You earned " + coinsEarned + " coins! Great work!");
            }
        };
        
        function updateBar() {
            numCat1 = $(".cat1.priority0:not(.completed-weight):not(.removed-weight)").length * 1;
            numCat1 += $(".cat1.priority1:not(.completed-weight):not(.removed-weight)").length * 2;
            numCat1 += $(".cat1.priority2:not(.completed-weight):not(.removed-weight)").length * 4;
            numCat1 += $(".cat1.priority3:not(.completed-weight):not(.removed-weight)").length * 16;
        
            numCat2 = $(".cat2.priority0:not(.completed-weight):not(.removed-weight)").length * 1;
            numCat2 += $(".cat2.priority1:not(.completed-weight):not(.removed-weight)").length * 2;
            numCat2 += $(".cat2.priority2:not(.completed-weight):not(.removed-weight)").length * 4;
            numCat2 += $(".cat2.priority3:not(.completed-weight):not(.removed-weight)").length * 16;
        
            numCat3 = $(".cat3.priority0:not(.completed-weight):not(.removed-weight)").length * 1;
            numCat3 += $(".cat3.priority1:not(.completed-weight):not(.removed-weight)").length * 2;
            numCat3 += $(".cat3.priority2:not(.completed-weight):not(.removed-weight)").length * 4;
            numCat3 += $(".cat3.priority3:not(.completed-weight):not(.removed-weight)").length * 16;
        
            let numCat1Complete = $(".cat1.priority0.completed-weight:not(.removed-weight)").length * 1;
            numCat1Complete += $(".cat1.priority1.completed-weight:not(.removed-weight)").length * 2;
            numCat1Complete += $(".cat1.priority2.completed-weight:not(.removed-weight)").length * 4;
            numCat1Complete += $(".cat1.priority3.completed-weight:not(.removed-weight)").length * 16;
        
            let numCat2Complete = $(".cat2.priority0.completed-weight:not(.removed-weight)").length * 1;
            numCat2Complete += $(".cat2.priority1.completed-weight:not(.removed-weight)").length * 2;
            numCat2Complete += $(".cat2.priority2.completed-weight:not(.removed-weight)").length * 4;
            numCat2Complete += $(".cat2.priority3.completed-weight:not(.removed-weight)").length * 16;
        
            let numCat3Complete = $(".cat3.priority0.completed-weight:not(.removed-weight)").length * 1;
            numCat3Complete += $(".cat3.priority1.completed-weight:not(.removed-weight)").length * 2;
            numCat3Complete += $(".cat3.priority2.completed-weight:not(.removed-weight)").length * 4;
            numCat3Complete += $(".cat3.priority3.completed-weight:not(.removed-weight)").length * 16;
        
            let totalWeight = numCat1 + numCat2 + numCat3 + numCat1Complete + numCat2Complete + numCat3Complete;
            if (totalWeight <= 0) {
                $("#weight_tray").addClass("removed-tray");
                // $("#weight_tray").fadeOut();
            } else {
                $("#weight_tray").removeClass("removed-tray");
        
                $("#weight_tray").fadeIn();
            }
        
            $("#cat1Bar").css('flex-grow', numCat1);
            $("#cat2Bar").css('flex-grow', numCat2);
            $("#cat3Bar").css('flex-grow', numCat3);
            $("#cat1BarComplete").css('flex-grow', numCat1Complete);
            $("#cat2BarComplete").css('flex-grow', numCat2Complete);
            $("#cat3BarComplete").css('flex-grow', numCat3Complete);
        
            let faceHeight = (tasksAtMaxFaceSquish - totalWeight) / tasksAtMaxFaceSquish;
            // console.log("totalWeight: " + totalWeight);
            faceHeight = Math.max(minFaceSize, faceHeight);
            // console.log("faceHeight: " + faceHeight);
            $(":root").css('--faceHeightPercent', faceHeight);
        };
        
        function removeLastWeightOfClass(targetParams) {
            // const targetParams = category+priority;
            const targetWeight = $(targetParams + ":not(.removed-weight)");
            targetWeight[0].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
            // targetWeight.last().removeClass("moved-weight");
            // targetWeight.last().removeClass("completed-weight");
            //end and print error if no matching weight is found
            if (targetWeight.length == 0) {
                console.warn("Tried to remove a weight that doesn't exist: " + targetParams);
                return;
            }
            targetWeight.last().addClass("removed-weight");
            // targetWeight.last().fadeOut();
            respaceWeights();
        };
        
        //removes every weight
        function removeEveryWeight() {
            repeatWithDelay(removeLastWeightOfClass, $(".weight").length, [".weight"], 100, 3000);
        };
        //removes every completed weight
        function removeCompletedWeights() {
            $(".weight").removeClass("moved-weight");
            $(".weight").removeClass("new-weight");

            repeatWithDelay(removeLastWeightOfClass, $(".completed-weight").length, [".completed-weight"], 500, 3000);

            let tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks.forEach((task, index, arr) => {
                if(task.completed){
                    arr.splice(index, 1);
                }
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        };
        
        //creates a new weight and places it at the end of the weights
        //if "animate" is true, the weight will be added at the top before moving to its new spot
        function createWeightOfClass(category, priority, completed = false, animate = true) {

            //prevent too many weights
            if($("#weights *").length>500){
                console.log("TOO MANY TASKS TO DISPLAY");
                return;
            }


            //removes . from class names
            //TODO: more robust filtering
            const filteredCategory = category.replace(".", "");
            const filteredPriority = priority.replace(".", "");
        
            //create the new weight
            const newWeight = $("<div></div>");
            newWeight.addClass("weight");
            newWeight.addClass(filteredCategory);
            newWeight.addClass(filteredPriority);
            if(completed){
                newWeight.addClass("completed-weight");
            }
            if (animate) {
                newWeight.addClass("new-weight");
            }
        

            
            //place the weight at the end
            $("#weights").append(newWeight);
        
            if (animate) {
                respaceWeights();
            } else {
                sortAllWeights();
                updateBar();
            }
        
            // debug, remove this
            // newWeight.on("click", function() {
            //     $(this).toggleClass("completed-weight");
            //     updateBar();
            // });
        
        };
        
        //sorts all weights.
        //categories are in alphabetical order
        //priorities are from least to most
        //Returns TRUE if any weights were moved
        function sortAllWeights() {
            //check if anything gets moved
            let anythingWasOutOfOrderLastSort = false;
        
            //edited from: https://stackoverflow.com/a/17017191
            let sortedWeights = $('#weights').find('div').sort(sortMe);
        
        
            function sortMe(a, b) {
                const i = a.className.localeCompare(b.className);
                // console.log(i);
                if (i < 0) {
                    anythingWasOutOfOrderLastSort = true;
                    // console.log("something found out of order")
                }
                return i;
            }
            // console.log("anythingWasOutOfOrderLastSort"+anythingWasOutOfOrderLastSort);
        
            if (anythingWasOutOfOrderLastSort) {
                $('#weights').append(sortedWeights);
            }
        
        
            return anythingWasOutOfOrderLastSort;
        };
        
        function repeatForEachWithDelay(callback, array = [], msBetween, maxTime) {
        
            //see if longest delay is longer than maxTime
            let theoreticalDelay = msBetween * array.length;
            const fillMaxTime = (theoreticalDelay > maxTime);
            console.log("fillMaxTime: " + fillMaxTime);
        
            let thisDelay = 0;
            array.forEach(function(value, index, array) {
        
                setTimeout(function() {
                        callback.apply(this, value);
                    },
                    thisDelay);
        
                if (fillMaxTime) {
                    const percentComplete = index / array.length;
                    thisDelay = percentComplete * maxTime;
                } else {
                    thisDelay += msBetween;
                }
            });
        };
        
        function repeatWithDelay(callback, count, args = [], msBetween, maxTime) {
            const originalCount = count;
        
            //see if longest delay is longer than maxTime
            let theoreticalDelay = msBetween * count;
            const fillMaxTime = (theoreticalDelay > maxTime);
            console.log("fillMaxTime: " + fillMaxTime);
        
            let thisDelay = 0;
            while (count > 0 && callback != null) {
                // console.log(thisDelay);
                count--;
                setTimeout(function() {
                        callback.apply(this, args);
                    },
                    thisDelay);
        
                if (fillMaxTime) {
                    const percentComplete = (originalCount - count) / originalCount;
                    thisDelay = percentComplete * maxTime;
                } else {
                    thisDelay += msBetween;
                }
            }
        };
        
        function DEBUGaddRandomWeights() {
            let randomWeights = [];

            let animate = sessionStorage.getItem("taskStackAlreadyAnimated");
            animate = (animate != "true");
            sessionStorage.setItem("taskStackAlreadyAnimated", true);
            let delay = 0;

            // animate = true;

            if(animate){
                delay = 100;
            }

            console.log("delay:"+delay);
            
            for (let index = 0; index < 100; index++) {
        
                //pick a random categorys
                let random = Math.floor(Math.random() * possibleCat.length);
                let category = possibleCat[random];
        
                //pick a random priority
                random = Math.random();
                let priority = possiblePriorities[0];
                switch (true) {
                    case random > .950:
                        priority = possiblePriorities[3];
                        break;
                    case random > .90:
                        priority = possiblePriorities[2];
                        break;
                    case random > .70:
                        priority = possiblePriorities[1];
                        break;
                    default:
                        priority = possiblePriorities[0];
                        break;
                }

                random = Math.random();
                const completed = random > .1;
        
                randomWeights.push([category, priority, completed, animate]);
            }

            console.log(randomWeights);
            repeatForEachWithDelay(createWeightOfClass,
                randomWeights,
                delay, 3000);
        
        
        };

        function addWeightsFromLocalStorage(){
            const tasks = JSON.parse(localStorage.getItem("tasks"));
            let weightsToAdd = [];

            let animate = sessionStorage.getItem("taskStackAlreadyAnimated");
            animate = (animate != "true");
            sessionStorage.setItem("taskStackAlreadyAnimated", true);
            let delay = 0;

            // animate = true;

            if(animate){
                delay = 100;
            }

            tasks.forEach(task => {
                let category = task.category;
                if (category==="Personal"){
                    category = ".cat1"
                }
                else if (category==="Learning"){
                    category = ".cat2"
                }
                else if (category==="Work"){
                    category = ".cat3"
                }

                const priority = task.priority;

                const completed = task.completed;

                weightsToAdd.push([category, priority, completed, animate]);
            });

            console.log("weightsToAdd: "+ weightsToAdd);
            repeatForEachWithDelay(createWeightOfClass,
                weightsToAdd,
                delay, 3000);
        }

        // this.addOneCoin();
        // DEBUGaddRandomWeights();
        // alert(localStorage.getItem("tasks"));
        addWeightsFromLocalStorage();

        // createWeightOfClass(".cat1", ".priority3", false);
        // alert(test);

        $('#addRandomWeightsButton').on("click", function() {DEBUGaddRandomWeights()});
        $('#clearCompletedTasksButton').on("click", function() {removeCompletedWeights()});
    };

    render(){
        return (
            <div className={'app_page'}>
                {/* <div className="top_header">
                    <h1>Task Stack</h1>
                </div> */}
                {/* <button onClick={addOneCoin}>Get a coin</button> */}
    
                <div id="flex_weights_container">
                    <div id="flex_weights_subcontainer">
                        {/* <!-- In reverse because flex:column-reverse! --> */}
                        <div id="face">
                            <div id="user_hat">
                                
                            </div>
                        </div>
                        <div id="weight_tray">
                            
                            <div id="cat1BarComplete" class="completed-tray-section"></div>
                            <div id="cat1Bar"></div>
                            
                            <div id="cat2BarComplete" class="completed-tray-section"></div>
                            <div id="cat2Bar"></div>
                            
                            <div id="cat3BarComplete" class="completed-tray-section"></div>
                            <div id="cat3Bar"></div>
                        </div>
                        <div id="weights"></div>
                        {/* <div id="weightCoinCounter">You have {localStorage.getItem('coins')} coins</div> */}
                    </div>
                </div>
                <button id='addRandomWeightsButton'>DEBUG add randoms</button>
                <button id='clearCompletedTasksButton'>clear complete tasks</button>
            </div>
        );
    }
};