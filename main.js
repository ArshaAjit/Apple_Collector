const NUM_BUSHES =50
const NUM_BALLS =5
const NUM_TREE=7
const NUM_ROTTEN=10

var score = 0

const player = document.querySelector('.player')
const player_pos = {
    x: parseInt(window.innerWidth/2),
    y: parseInt(window.innerHeight/2)
}
const player_vel ={
    x: 0,
    y: 0 

}
const balls = []
const rots = []

const sound = new Audio('assets/bite.mp3')
const rotsound = new Audio('assets/coin.mp3')

function createBushes(){
    for(let i=0;i<NUM_BUSHES;i++){
        const div=document.createElement('div')
        div.classList.add('bush')
        div.style.left = Math.random() * 80 + '%'
        div.style.right = Math.random() * 80 + '%'
        div.style.top = Math.random() * 80 + '%'
        document.body.appendChild(div)
    }
}

function createTree(){
    for(let i=0;i<NUM_TREE;i++){
        const div=document.createElement('div')
        div.classList.add('tree')
        div.style.left = Math.random() * 80 + '%'
        div.style.right = Math.random() * 80 + '%'
        div.style.top = Math.random() * 80 + '%'
        document.body.appendChild(div)
    }
}

function generateBall(){
    const div = document.createElement('div')
    div.classList.add('apple')
    let x = Math.random() * 80 + '%'
    let y = Math.random() * 80 + '%'
    div.style.left = x
    div.style.top = y
    balls.push({
        ball: div,
        pos: {
            x,
            y
        }
    })
    document.body.appendChild(div)
}

function createBalls(){
    for(i=0;i<NUM_BALLS;i++){
       generateBall()
    }
}

function generateRotten(){
    const div = document.createElement('div')
    div.classList.add('rotten')
    let x = Math.random() * 80 + '%'
    let y = Math.random() * 80 + '%'
    div.style.left = x
    div.style.top = y
    rots.push({
        rot: div,
        pos: {
            x,
            y
        }
    })
    document.body.appendChild(div)
}

function createRotten(){
    for(i=0;i<NUM_ROTTEN;i++){
        generateRotten()
    }
}

function collision($div1, $div2) {
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;

    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

function checkCollisions(){
    balls.forEach(ball => {
        if(collision(ball.ball, player)){
            sound.play()
            ball.ball.remove()
            updateScore()
            generateBall()
        }
    })
}

function checkRotCollisions(){
    rots.forEach(rot => {
        if(collision(rot.rot, player)){
            rotsound.play()
            rot.rot.remove()
            generateRotten()
            displayGameover() 
        }
    })
}

function updateScore(){
    score+=1
    scoreCont.innerHTML = "Your Score: " + score
}
 function displayGameover(){
    window.alert("Gameover..... You got " + score +" apples" );
    window.location.reload();
 }

function run(){
    player_pos.x += player_vel.x
    player_pos.y += player_vel.y

    player.style.left=player_pos.x + 'px'
    player.style.bottom=player_pos.y +'px'

    checkCollisions()
    checkRotCollisions()

    requestAnimationFrame(run)
}

function init(){
    createBushes()
    createBalls()
    createTree()
    createRotten()

    run()
}
init()

window.addEventListener('keydown',function(e){
    if(e.key == 'ArrowUp'){
        player_vel.y=3
        player.style.backgroundImage = 'url("assets/player_front.png")'
    }
    if(e.key=='ArrowDown'){
        player_vel.y=-3
        player.style.backgroundImage = 'url("assets/player_back.png")'
    }
    if(e.key=='ArrowLeft'){
        player_vel.x= -3
        player.style.backgroundImage = 'url("assets/player_left.png")'
    }
    if(e.key=='ArrowRight'){
        player_vel.x=3
        player.style.backgroundImage = 'url("assets/player_right.png")'
    }
    player.classList.add('active')
})
window.addEventListener('keyup', function(){
    player_vel.x = 0
    player_vel.y = 0
    player.classList.remove('active')
})



