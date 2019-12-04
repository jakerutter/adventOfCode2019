
function getPasswordCount(considerOverMatch){
    var passwordCount = 0;
    var range = [156218, 652527];
    var possiblePasswords = [];

    for(let i=156218; i<=652527; i++){

        let split = ('' + i).split('');
        let slippage = false;
        let matchCount = 0;
        let multMatchNum = [];
        let singleMatch = [];

        for (let k=0; k<split.length; k++){

            slippage = split[k] > split[k+1] ? true : false;
            if (slippage){ break; }

            split[k] === split[k+1] ? matchCount += 1 : "";
            singlematch = split[k] === split[k+1] ? singleMatch.push(split[k]) : singleMatch;

            if(considerOverMatch){

                if (split[k] === split[k+1] && split[k+1] === split[k+2])
                { 
                    multMatchNum.push(split[k]); 
                }
            }
        }

        if (considerOverMatch && multMatchNum.length > 0 && singleMatch.length > 0){
            for(let z=0; z<multMatchNum.length; z++){
                for(let y=0; y<singleMatch.length; y++){
                    if(multMatchNum[z] === singleMatch[y]){
                        var filtered = singleMatch.filter(function(element){
                            return element !== singleMatch[y];
                        });
                        singleMatch = filtered;
                    }
                }
            }
        }

        if (!slippage && !considerOverMatch && matchCount > 0 || !slippage && considerOverMatch && singleMatch.length > 0){
            possiblePasswords.push(i);
        }
    }
    passwordCount = possiblePasswords.length;

    return passwordCount;
}


document.addEventListener("DOMContentLoaded", function() {
    
    let count = getPasswordCount(false);
    document.getElementById('part1').innerHTML += count;

    let secondCount = getPasswordCount(true);
    document.getElementById('part2').innerHTML += secondCount;
});