
let game = {
  'user':{'span':'#user-point','div':'#user-box','point':0},
  'jarves':{'span':'#jarves-point','div':'#jarves-box','point':0},
  'cards':['2','3','4','5','6','7','8','9','10','11','12','13','1'],
  'cards_value':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'11':10.2,'12':10.3,'13':10.5,'1':[1,11]},
  'wins':0,
  'lose':0,
  'drew':0,
  'standmod':false,
  'turn-over':false,
  'hitover':false,
  'sounds':{'hitsound':new Audio('  '),'winsound':new Audio(' '),'losesound':new Audio(' '),'drewsound':new Audio(' ')},
}
// makeing shortcut
const sound = game.sounds;
const user = game.user;
const jarves = game.jarves;

//for hit buton
document.querySelector('#game-hit-btn').addEventListener ('click',hit);
//for stand buton
document.querySelector('#game-stand-btn').addEventListener('click',stand);
//for deal button
document.querySelector('#game-deal-btn').addEventListener('click',deal);

// hit btn 1 call
function hit(){
  if(game.standmod === false){
    //.play();
    game.hitover = true;
  let card = random_cards();
  show_card(user,card);
  update_point(card,user);
  show_point(user);
  }
}

// some promisess and async finction for bot jarves

function autosleep(ms){
  return new Promise(resolve => setTimeout (resolve,ms));
  
}


//1 call stand btn
async function stand(){
  if (game.hitover === true){
  game.standmod = true;
  
  while(jarves.point < 16 && game.standmod === true ){
  let card = random_cards();
  show_card(jarves,card);
  update_point(card,jarves);
  show_point(jarves);
  await autosleep(600);
  }
 // if (jarves.point >= 15){
   game.turnover = true;
   show_massage(winning());
//  }
  game.hitover=false;
 }
}
//1call deal function
function deal(){
  if(game.turnover === true){
  game.standmod = false;
  remove_card();
  }
}
// 2 call hit || stand function
function show_card(active_player,img){
  if (active_player.point <= 21){
 let card_img = document.createElement('img');
  card_img.src =`sorces/pic${img}.jpg`;
  document.querySelector(active_player.div).appendChild(card_img);
}
}
  // random cards generate for both
function random_cards(){
  let x = Math.floor(Math.random()*13);
  return game.cards[x];

}

// 2 call deal function
function remove_card() {
  reset_text();
let u_img_remove = document.querySelector(user.div).querySelectorAll('img');
let j_img_remove = document.querySelector(jarves.div).querySelectorAll('img');

for (let i=0; i < u_img_remove.length; i++) {
    u_img_remove[i].remove();
}
  for (let i=0; i < j_img_remove.length; i++) {
j_img_remove[i].remove();
}
}
//change back to point 0 0 call from deal && text to orginal form ..
function reset_text(){
   user.point =0;
   jarves.point=0;
    document.querySelector(user.span).textContent = user.point;
    document.querySelector(jarves.span).textContent = jarves.point;
    document.querySelector(user.span).style.color= 'green';
    document.querySelector(jarves.span).style.color ='red';
    document.querySelector('#game-result').textContent = "Let's Play ";
    document.querySelector('#game-result').style.color = 'black';
   game.turnover = false;
    
}
//update && write both player
function update_point(cards,activeplayer){
  if (cards==='1'){
        if(activeplayer.point+game.cards_value[cards][1] <= 21){
          activeplayer.point += game.cards_value[cards][1];
      }else{
           activeplayer.point += game.cards_value[cards][0];
      }
  }
  else {
     activeplayer.point += game.cards_value[cards];
  }
}
//showing both player point call from hit || deal
  function show_point(activeplayer){
    if(activeplayer.point > 21){
           document.querySelector(activeplayer.span).textContent='!!busted!!';
           document.querySelector(activeplayer.span).style.color='red';
           
    }else{
    document.querySelector(activeplayer.span).textContent = activeplayer.point;
    }
}
// deciding to who is winner call from deal button
  function winning(){
    let winner;
    if(user.point <= 21){
      if(user.point > jarves.point || jarves.point> 21){
        game.wins++;
        winner ='user';
      }else if (user.point < jarves.point) {
        game.lose++;
        winner = 'jarves' ;
      } else if (user.point === jarves.point){
        game.drew++;
        winner = 'drew' ;
      }
    }else if (user.point >= 21 && jarves.point <= 21  ) {
      game.lose++;
      winner = 'jarves' ;
    } else if (user.point > 21 && jarves.point > 21){
      game.drew++;
      winner = 'drew' ;
      
    }
    return winner;
}
//shoing massage call from stand auto bot
function show_massage(win){
  let massage,color;
  if (game.turnover===true){
  if(win==='user'){
    document.querySelector('#win-score').textContent= game.wins;
    massage = '$ You Won ';
    color = 'green';
    //.play(); not have url
  }else if(win==='jarves'){
    document.querySelector('#lose-score').textContent= game.lose;
    massage = ' You Lose !';
    color='red';
    //.play();
  }else{
    document.querySelector('#drew-score').textContent= game.drew;
    massage = '% DREW %';
    color='yellow';
   // .play()
    
  }
  document.querySelector('#game-result').textContent = massage;
  document.querySelector('#game-result').style.color = color;
  }
}





