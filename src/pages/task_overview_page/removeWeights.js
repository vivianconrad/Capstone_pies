const possibleCat = ["cat1", "cat2", "cat3"];
const possiblePriorities = ["priority0", "priority1", "priority2", "priority3"];
const minFaceSize = 90;

weightDeleteTimeout = Promise;

numCat1 = 0;
numCat2 = 0;
numCat3 = 0;


// updateBar();
DEBUGaddRandomWeights();

// $(".weight").click(function(){
//     // $(this).toggleClass("completed-weight");
//     // $(".weight").removeClass("moved-weight");
//     // clearTimeout(weightDeleteTimeout);
//     console.log("weightClicked");
//     // $(this).addClass("removed-weight");
//     // updateBar();
//     // weightDeleteTimeout = setTimeout('respaceWeights()', 1100);
// });




function respaceWeights(){
    $(".weight.new-weight.moved-weight").removeClass("new-weight");
    $(".weight").removeClass("moved-weight");
    updateBar();

    clearTimeout(weightDeleteTimeout);
    weightDeleteTimeout = setTimeout('respaceWeightsPartTwo()', 2000);
}

function respaceWeightsPartTwo(){
    const weightsToRemove = $(".removed-weight");
    const numOfWeightsRemoved = weightsToRemove.length;
    // console.log(numOfWeightsRemoved);
    weightsToRemove.remove();

    const weightsWereMoved = sortAllWeights();
    if(weightsWereMoved || numOfWeightsRemoved>0){
        $(".weight").addClass("moved-weight");
    }
}

function updateBar(){
    numCat1 = $(".cat1.priority0:not(.removed-weight)").length*1;
    numCat1 += $(".cat1.priority1:not(.removed-weight)").length*2;
    numCat1 += $(".cat1.priority2:not(.removed-weight)").length*4;
    numCat1 += $(".cat1.priority3:not(.removed-weight)").length*16;
    
    numCat2 = $(".cat2.priority0:not(.removed-weight)").length*1;
    numCat2 += $(".cat2.priority1:not(.removed-weight)").length*2;
    numCat2 += $(".cat2.priority2:not(.removed-weight)").length*4;
    numCat2 += $(".cat2.priority3:not(.removed-weight)").length*16;

    numCat3 = $(".cat3.priority0:not(.removed-weight)").length*1;
    numCat3 += $(".cat3.priority1:not(.removed-weight)").length*2;
    numCat3 += $(".cat3.priority2:not(.removed-weight)").length*4;
    numCat3 += $(".cat3.priority3:not(.removed-weight)").length*16;

    console.log(numCat1);
    console.log(numCat2);
    console.log(numCat3);

    let totalWeight = numCat1 + numCat2 + numCat3;
    if (totalWeight <= 0){
        $("#weight_tray").addClass("removed-tray");
        // $("#weight_tray").fadeOut();
    }
    else{
        $("#weight_tray").removeClass("removed-tray");

        $("#weight_tray").fadeIn();
    }   

    $("#cat1Bar").css('flex-grow',numCat1);
    $("#cat2Bar").css('flex-grow',numCat2);
    $("#cat3Bar").css('flex-grow',numCat3);

    // totalWeight = Math.min(totalWeight, minFaceSize);
    // const faceHeight = (100-totalWeight).toString()+"%";
    // console.log("totalWeight: " + totalWeight);
    // console.log("faceHeight: " + faceHeight);
    // $("#face").css('flex-basis', faceHeight);
}

function removeLastWeightOfClass(targetParams){
    // const targetParams = category+priority;
    const targetWeight = $(targetParams+":not(.removed-weight)");
    //end and print error if no matching weight is found
    if(targetWeight.length == 0){
        console.warn("Tried to remove a weight that doesn't exist: " + targetParams);
        return;
    }
    targetWeight.last().addClass("removed-weight");
    respaceWeights();
}

//removes every weight
function removeEveryWeight(){
    repeatWithDelay(removeLastWeightOfClass, $(".weight").length, [".weight"], 100, 3000);
}
//removes every completed weight
function removeCompletedWeights(){
    repeatWithDelay(removeLastWeightOfClass, $(".completed-weight").length, [".completed-weight"], 200, 3000);
}

//creates a new weight and places it at the end of the weights
//if "animate" is true, the weight will be added at the top before moving to its new spot
function createWeightOfClass(category, priority, animate=false){
    //removes . from class names
    //TODO: more robust filtering
    const filteredCategory = category.replace(".", "");
    const filteredPriority = priority.replace(".", "");

    //create the new weight
    const newWeight = $("<div></div>");
    newWeight.addClass("weight");
    newWeight.addClass(filteredCategory);
    newWeight.addClass(filteredPriority);
    if(animate){
        newWeight.addClass("new-weight");
    }


    //place the weight at the end
    $("#weights").append(newWeight);

    if(animate){
        respaceWeights();
    }
    else{
        sortAllWeights();
        updateBar();
    }

    // debug, remove this
    newWeight.click(function(){
        $(this).toggleClass("completed-weight");
    });
    
}

//sorts all weights.
//categories are in alphabetical order
//priorities are from least to most
//Returns TRUE if any weights were moved
function sortAllWeights(){
    //check if anything gets moved
    let anythingWasOutOfOrderLastSort = false;

    //edited from: https://stackoverflow.com/a/17017191
    let sortedWeights = $('#weights').find('div').sort(sortMe);


    function sortMe(a, b) {
        const i = a.className.localeCompare(b.className);
        // console.log(i);
        if(i<0){
            anythingWasOutOfOrderLastSort = true; 
            // console.log("something found out of order")
        }
        return i;
    }
    // console.log("anythingWasOutOfOrderLastSort"+anythingWasOutOfOrderLastSort);

    if(anythingWasOutOfOrderLastSort){
        $('#weights').append(sortedWeights);
    }


    return anythingWasOutOfOrderLastSort;
}

function repeatForEachWithDelay(callback, array = [], msBetween, maxTime){
    
    //see if longest delay is longer than maxTime
    let theoreticalDelay = msBetween*array.length;
    const fillMaxTime = (theoreticalDelay > maxTime);
    console.log("fillMaxTime: " + fillMaxTime);

    let thisDelay = 0;
    array.forEach(function(value, index, array){

        setTimeout(function(){
                    callback.apply(this, value);
                }, 
                thisDelay);

        if(fillMaxTime){
            const percentComplete = index/array.length;
            thisDelay = percentComplete * maxTime;
        }else{
            thisDelay += msBetween;
        }
    });
}

function repeatWithDelay(callback, count, args = [], msBetween, maxTime){
    const originalCount = count;
    
    //see if longest delay is longer than maxTime
    let theoreticalDelay = msBetween*count;
    const fillMaxTime = (theoreticalDelay > maxTime);
    console.log("fillMaxTime: " + fillMaxTime);

    let thisDelay = 0;
    while(count>0 && callback!=null){
        console.log(thisDelay);
        count--;
        setTimeout(function(){
            callback.apply(this, args);
        }, 
        thisDelay);

        if(fillMaxTime){
            const percentComplete = (originalCount-count)/originalCount;
            thisDelay = percentComplete * maxTime;
        }else{
            thisDelay += msBetween;
        }
    }
}

function DEBUGaddRandomWeights(){
    let randomWeights = [];
    for (let index = 0; index < $("#numberToAdd").val(); index++) {
        
        //pick a random categorys
        let random = Math.floor(Math.random()*possibleCat.length);
        let category = possibleCat[random];
        
        //pick a random priority
        random = Math.random();
        let priority = possiblePriorities[0];
        switch (true) {
            case random>.950:
                priority = possiblePriorities[3];
                break;
            case random>.90:
                priority = possiblePriorities[2];
                break;
            case random>.70:
                priority = possiblePriorities[1];
                break;
            default:
                priority = possiblePriorities[0];
                break;
        }

        randomWeights.push([category, priority, true]);
    }

    console.log(randomWeights);
    repeatForEachWithDelay(createWeightOfClass, 
        randomWeights,
    500, 3000);

    
}