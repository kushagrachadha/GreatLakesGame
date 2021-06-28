const prompt = require('prompt-sync')({sigint: true});

//initialize game object
const initializePlayers = (count) => {
  let players = {};
  for (let i = 1; i <= count; i++) {
    players[`Player-${i}`] = { score: 0, oneCount: 0 };
  }
  return players;
};

//shuffle players at start
const shufflePlayers = (obj) => {
  let array = Object.keys(obj);
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

//check two continuous skips
const checkForSkipping = (currentPlayer, players) => {
  if (players[currentPlayer].oneCount == 2) {
    players[currentPlayer].oneCount = 0;
    return true;
  }
  return false;
};
//printing game object
const printRanking=(players)=>{
  let sortedPlayers=Object.keys(players).sort((a,b)=>players[b].score-players[a].score);
  let rankings=sortedPlayers.map((item,index)=>(
     {Rank:index+1,Name:item,score:players[item].score}
  ))
  console.table(rankings);
}
const count = parseInt(prompt("Enter Total Number of Players."));
  if (isNaN(count)) {
    console.log("Invalid number of players. Exitting game!!!!!");
    process.exit(1);
  }


const maxScore = parseInt(prompt("Enter Maximum Score to win."));
if (isNaN(maxScore)) {
  console.log("Invalid Maximum Score. Exitting game!!!!!");
  process.exit(1);
}

//set players
const players = initializePlayers(count);

//randomize order
let playingOrder = shufflePlayers(players);
let currentCount = 0;
while (true) {
  console.log(currentCount)
  currentCount=currentCount < count?currentCount:0;
  let currentPlayer =playingOrder[currentCount];
    console.log(currentPlayer);
  if (checkForSkipping(currentPlayer, players)) {
    console.log(`Skipping turn for ${currentPlayer}`);
    currentCount++;
    continue;
  }
  while(true){
    let input=prompt(`${currentPlayer} its your turn (press ‘r’ to roll the dice)`);
    if(input=='r'||input=='R'){
      break;
    }
    else{
      console.log("Invalid Input please Try again!")
    }
  }
  let dieRoll=Math.floor(Math.random()*6 + 1);

  console.log(`${currentPlayer} gets ${dieRoll} points`);
  players[currentPlayer].score=players[currentPlayer].score+dieRoll;
  printRanking(players);
  if(players[currentPlayer].score>=maxScore){
    console.log(`Congratulations  ${currentPlayer} you win!!!!`)
    process.exit(0);
  }
  if(dieRoll==1){
    players[currentPlayer].oneCount=players[currentPlayer].oneCount+1;
    console.log(`${currentPlayer} has ${players[currentPlayer].oneCount} continuous 1 :(`)
  }
  else{
    players[currentPlayer].oneCount=0;
  }
  if(dieRoll==6){
    console.log(`Congratulations ${currentPlayer} you get another chance !!`)
  }
  else{
    currentCount++;
  }
}
