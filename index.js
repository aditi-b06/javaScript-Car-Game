const score=document.querySelector('.Score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

const colors = ['purple','yellow','blue','red','pink','orange','yellowgreen','palegreen','#e6a314','#fa038b','#03fafa'];
const n=3;

let keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowLeft : false,
    ArrowRight : false
}

let player={speed : 5, score : 0 }


function collision(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){

        if(item.y >= 700){
            item.y -= 750;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    // startScreen.innerHTML = 
}

function moveEnemyCars(car){
    let ec = document.querySelectorAll('.enemy');
    ec.forEach(function(item){
        if(collision(car,item)){
            endGame();
            startScreen.innerHTML = "Game Over <br> Your final score is "+player.score+"<br>Press here to restart the game."
        }

        if(item.y >= 750){
            item.y = -300;
            item.style.backgroundImage= "url('car1.png')";
            item.style.backgroundPosition = 'no-repeat';
            item.style.backgroundSize = '100% 100%';
            item.style.left = Math.floor(Math.random()*400) + "px";
            item.style.backgroundColor = colors[Math.floor(Math.random()*(colors.length))];
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gamePlay(){

    let car = document.querySelector('.car');
    car.style.backgroundColor = 'yellow' ;
    let road = gameArea.getBoundingClientRect();
    car.style.backgroundImage= "url('car1.png')";
    car.style.backgroundPosition = 'no-repeat';
    car.style.backgroundSize = '100% 100%';

    if(player.start){

        moveEnemyCars(car);
        moveLines();

        if(keys.ArrowUp && player.y > 70){ player.y -= player.speed }
        if(keys.ArrowDown && player.y < (road.height -70)){ player.y += player.speed }
        if(keys.ArrowLeft && player.x > 0){ player.x -= player.speed }
        if(keys.ArrowRight && player.x < (road.width-50)){ player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        if(player.score===1000){player.speed+=1;window.requestAnimationFrame(gamePlay);}
        if(player.score===2000){ player.speed +=1; window.requestAnimationFrame(gamePlay);} 
        if(player.score===4000){  player.speed +=1; window.requestAnimationFrame(gamePlay);}
        window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerText = "Score : " +player.score;

    }
}

function start(){
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";

    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(x=0;x<5;x++){
        let roadLines = document.createElement('div');
        roadLines.setAttribute('class','lines');
        roadLines.y = (x*150);
        roadLines.style.top =  roadLines.y + "px";
        gameArea.appendChild(roadLines);
    }

    let car = document.createElement('div');
    car.setAttribute('class','car');
    // car.innerText="Ur car buddy!!!"
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    
    for(x=0;x<n;x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y = ((x+1)*350)*-1;
        enemyCar.style.top =  enemyCar.y + "px";
        enemyCar.style.left = Math.floor(Math.random()*450) + "px";
        enemyCar.style.backgroundImage= "url('car1.png')";
        enemyCar.style.backgroundPosition = 'no-repeat';
        enemyCar.style.backgroundSize = '100% 100%';
        enemyCar.style.backgroundColor = colors[Math.floor(Math.random()*(colors.length))];
        gameArea.appendChild(enemyCar);
    }

    // console.log(player.x);
    // console.log(player.y);

}

startScreen.addEventListener('click',start);

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
    // console.log(e.key);
    // console.log(keys);
}

function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
    // console.log(e.key);
    // console.log(keys);
}