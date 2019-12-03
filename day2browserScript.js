var input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,6,19,23,2,6,23,27,1,5,27,31,2,31,9,35,1,35,5,39,1,39,5,43,1,43,10,47,2,6,47,51,1,51,5,55,2,55,6,59,1,5,59,63,2,63,
    6,67,1,5,67,71,1,71,6,75,2,75,10,79,1,79,5,83,2,83,6,87,1,87,5,91,2,9,91,95,1,95,6,99,2,9,99,103,2,9,103,107,1,5,107,111,1,111,5,115,1,115,13,119,1,13,119,123,2,6,123,
    127,1,5,127,131,1,9,131,135,1,135,9,139,2,139,6,143,1,143,5,147,2,147,6,151,1,5,151,155,2,6,155,159,1,159,2,163,1,9,163,0,99,2,0,14,0];

var inputPt1 = [1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,6,19,23,2,6,23,27,1,5,27,31,2,31,9,35,1,35,5,39,1,39,5,43,1,43,10,47,2,6,47,51,1,51,5,55,2,55,6,59,1,5,59,63,2,63,
    6,67,1,5,67,71,1,71,6,75,2,75,10,79,1,79,5,83,2,83,6,87,1,87,5,91,2,9,91,95,1,95,6,99,2,9,99,103,2,9,103,107,1,5,107,111,1,111,5,115,1,115,13,119,1,13,119,123,2,6,123,
    127,1,5,127,131,1,9,131,135,1,135,9,139,2,139,6,143,1,143,5,147,2,147,6,151,1,5,151,155,2,6,155,159,1,159,2,163,1,9,163,0,99,2,0,14,0];

var testInput = [1,9,10,3,2,3,11,0,99,30,40,50];
var testInput2 = [1,0,0,0,99];
var testInput3 = [1,1,1,4,99,5,6,0,99];

function loopExecute(input){
    var goal = 19690720;
    var verb = 0;
    var mutatedInput = JSON.parse(JSON.stringify(input));
    for(var noun=0; noun<100; noun++){

        for(var verb=0; verb<100; verb++){
            mutatedInput = JSON.parse(JSON.stringify(input));
            result = execute(mutatedInput, noun, verb);

            if (goal === result){ 
                document.getElementById('output').innerHTML += mutatedInput[1];
                document.getElementById('output').innerHTML += ", " + mutatedInput[2];
                let finalAnswer =  Number(mutatedInput[1]) * 100 + Number(mutatedInput[2]);
                document.getElementById('output').innerHTML += " -- final answer = " + finalAnswer;
                return;
            }
        }
    }
    result = goal;
    console.log('did not find the solution in the program');
}

function execute(input, noun, verb){

        if (noun != undefined){
            input[1] = noun;
        }

        if (verb != undefined){
            input[2] = verb;
        }
        var currentIndex = 0;

        while (currentIndex + 4 < input.length){

            var opCode = input[currentIndex];
            if (opCode > 2 && opCode != 99){
                console.log('bad opCode. value is '+ opCode + " at index " + currentIndex);
                break;
            }
            input = opCode === 99 ? input : calcValues(input, currentIndex);

            if (opCode === 99){
                break;
            }

            currentIndex += 4;
        }
        return input[0];
}

function calcValues(input, currentIndex){
    var opCode = input[currentIndex];

    var index1 = input[currentIndex+1];
    var value1 = input[index1];
    var index2 = input[currentIndex+2];
    var value2 = input[index2];

    var index3 = input[currentIndex+3];

    var total = opCode === 1 ? value1 + value2 : value1 * value2;

    input[index3] = total;

    return input;
}

document.addEventListener("DOMContentLoaded", function() {
    let answer = execute(inputPt1);
    document.getElementById('pt1Result').innerHTML += answer;
    loopExecute(input);
  });