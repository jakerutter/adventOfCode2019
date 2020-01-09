
function main(input, deckSize){

  let deck = prepareDeck(deckSize);

  for(let line=0; line<input.length; line++){

    if (input[line].includes('deal into new stack')){

      deck = newStack(deck);

    } else if(input[line].includes('cut')){

      let cutValue = parseLine(input[line], 'cut');

      if (cutValue < 0){
        cutValue = Math.abs(cutValue);
        deck = cutTheDeck(deck, cutValue, true);
      } else {
        deck = cutTheDeck(deck, cutValue, false);
      }
      
    } else if(input[line].includes('deal with increment')){

      let increment = parseLine(input[line], 'increment');
      deck = dealIncrement(deck, increment);
    }
  }


  if (deck.length > 10){

    console.log(deck);
    console.log(deck[2019] + ' is the value of card at index 2019');
    console.log(deck.indexOf(2019) + ' is the position of card 2019');
    document.getElementById('part1').innerHTML += deck.indexOf(2019) + ' is the position of card 2019';
    
  }

}

function prepareDeck(size){
    let deck = [];
    for(let i=0; i<size; i++){
      deck.push(i);
    }
  return deck;
}

function newStack(deck){
  let newDeck = [];
  for(let i=deck.length-1; i>=0; i--){
    newDeck.push(deck[i]);
  }
  
  return newDeck;
}

function cutTheDeck(deck, cutValue, fromBottom){

  let tempDeck = [];
  let cutDeck = [];
  // standard cut from top of deck
  if (!fromBottom){

    tempDeck =  deck.splice(0, cutValue);

    for(let j=0; j<deck.length; j++){
      cutDeck.push(deck[j]);
    }

    for(let i=0; i<tempDeck.length; i++){
      cutDeck.push(tempDeck[i]);
    }
  }
  // non standard cut from bottom of deck
  else {
    tempDeck =  deck.splice(-cutValue, cutValue);

    for(let i=0; i<tempDeck.length; i++){
      cutDeck.push(tempDeck[i]);
    }

    for(let j=0; j<deck.length; j++){
      cutDeck.push(deck[j]);
    }
  }

  return cutDeck;
}

function dealIncrement(deck, increment){
  let newDeck = [];
  
  for(let i=0; i<deck.length; i++){
    newDeck.push(-1);
  }

  let index = 0;
  while(deck.length > 0){

      if (index >= (newDeck.length)){
        index = index % (newDeck.length);
      }

      // when in doubt / HACK
      if (newDeck[index] !== -1){
        index += 1;
        // console.log('error. ---- ');
        // console.log('index is ' + index + ' and the value at that index is ' + newDeck[index]);
      }

      newDeck.splice(index, 1, deck[0]);
      deck.splice(0, 1);
      index += increment;

  }

  if (newDeck.includes(-1)){
    console.log(increment + ' is increment');
    let count = 0;
    for(let k=0; k<newDeck.length; k++){
      if(newDeck[k] === -1){
        count +=1;
      }
    }
    console.log('there are this many -1s in newDeck ' + count);
  }

  return newDeck;
}

function parseLine(line, keyWord){
  let val = -9999;

  val = line.substring(line.indexOf(keyWord) + keyWord.length, line.length);
  val = val.trim();
  val = Number(val);
  return val;
}







document.addEventListener("DOMContentLoaded", function() {
  
  let example1 = ['deal with increment 7',
  'deal into new stack',
  'deal into new stack'];
  main(example1, 10);
  console.log('0 3 6 9 2 5 8 1 4 7   <-- expected result');
  console.log('-----');

  let example2 = ['cut 6',
  'deal with increment 7',
  'deal into new stack'];
  main(example2, 10);
  console.log('3 0 7 4 1 8 5 2 9 6   <-- expected result');
  console.log('-----');

  let example3 = ['deal with increment 7',
  'deal with increment 9',
  'cut -2'];
  main(example3, 10);
  console.log('6 3 0 7 4 1 8 5 2 9   <-- expected result');
  console.log('-----');

  let example4 = ['deal into new stack',
  'cut -2',
  'deal with increment 7',
  'cut 8',
  'cut -4',
  'deal with increment 7',
  'cut 3',
  'deal with increment 9',
  'deal with increment 3',
  'cut -1'];
  main(example4, 10);
  console.log('9 2 5 8 1 4 7 0 3 6   <-- expected result');
  console.log('-----');

  // let inputTest = ["deal with increment 5","cut 9569","deal with increment 22"];
  // main(inputTest, 10008);

  let realInput = ["deal with increment 5","cut 9569","deal with increment 22","cut -9977","deal with increment 64","cut -4758","deal with increment 12","cut 8507","deal with increment 7","cut -4724","deal with increment 3","cut 7577","deal with increment 20","cut -1543","deal into new stack","deal with increment 62","deal into new stack","deal with increment 62","cut 4879","deal into new stack","deal with increment 34","cut 3555","deal with increment 8","cut -6954","deal with increment 32","cut -4299","deal into new stack","deal with increment 70","cut -5387","deal with increment 32","deal into new stack","cut -5074","deal into new stack","deal with increment 14","cut -1405","deal with increment 40","cut 4665","deal with increment 42","deal into new stack","deal with increment 20","cut 5945","deal with increment 73","cut 9777","deal with increment 32","cut 4783","deal into new stack","deal with increment 63","cut -3388","deal with increment 18","cut 6364","deal with increment 34","cut -7962","deal into new stack","cut -5937","deal with increment 70","cut -3600","deal with increment 46","deal into new stack","cut -3460","deal with increment 61","cut 8430","deal with increment 33","cut -9068","deal into new stack","deal with increment 75","cut 3019","deal with increment 5","cut -2963","deal with increment 59","cut -2973","deal with increment 64","cut 3203","deal with increment 13","cut -9915","deal with increment 60","cut 5823","deal with increment 26","cut 2255","deal with increment 35","cut -8491","deal with increment 75","cut -8065","deal with increment 38","cut 8417","deal with increment 75","cut 7005","deal into new stack","deal with increment 67","deal into new stack","cut -896","deal into new stack","cut -7243","deal into new stack","deal with increment 29","cut -4407","deal with increment 63","cut -8660","deal into new stack","cut 7411","deal into new stack"];
  main(realInput, 10008);
});