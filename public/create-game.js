
export default function createGame(){
    const state = {
    players:{},
    fruits:{},
    bala:{},
    screen:{
        width:10,
        height:10,
        pixelsPerFields: 5,
    }
}
const observers =[]

function start(){
    const frequency = 8000
    setInterval(addfruits, frequency)
}

function subscribe(observerFunction){
    observers.push(observerFunction)
}

function notifyAll(command){
    for(const observerFunction of observers){
        observerFunction(command)
    }
}
function setState(newState){
    Object.assign(state,newState)
}

const addPlayers = command=>{
    const playerId = command.playerId
    const playerx = 'playerx' in command ? command.playerx:Math.floor(Math.random()*state.screen.width)
    const playery = 'playery' in command ? command.playery:Math.floor(Math.random()*state.screen.height)
    const score = 0
    state.players[playerId] = {
        x:playerx,
        y:playery,
       score
    }
    notifyAll({
        type:'add-player',
        playerId:playerId,
        playerx:playerx,
        playery:playery,
        score:score
    })
}
const removePlayers = command =>{
    const playerId = command.playerId
    delete state.players[playerId]
    console.log(command)
 notifyAll({
    type:command.type === 'remove-player'||command.type === 'player-left'?command.type:'remove-player',
    playerId:playerId,
    enemyId:command.type == 'remove-player'?command.enemyId:0

 })
}
const addfruits = command=>{
    const fruitId = command ? command.fruitId :Math.floor(Math.random()*10000)
    const fruitx = command ? command.fruitx:Math.floor(Math.random()*state.screen.width)
    const fruity = command ? command.fruity:Math.floor(Math.random()*state.screen.width)
    state.fruits[fruitId] = {
        x:fruitx,
        y:fruity,
        
    }
   
    notifyAll({
        type:'add-fruit',
        fruitId:fruitId,
        fruitx:fruitx,
        fruity:fruity
    })
}
const removeFruits = command =>{
    const fruitId = command.fruitId
    delete state.fruits[fruitId]
    notifyAll({
        type:'remove-fruit',
        fruitId:fruitId,
    })

}
const movePlayer = command =>{
    notifyAll(command)
        const acceptedMoves = {
            w(player){
        player.y -=1
    if( player.y <0){
    player.y = state.screen.height-1
}
    },
            d(player){
                player.x +=1
                console.log(player.x,state.screen.width)
            if(player.x ==state.screen.width){
                player.x =state.screen.width/2-(state.screen.width/2)
            }
        
    },
            s(player){
                player.y += 1
            if(player.y == state.screen.height){
                player.y = 0
        }
    },
    a(player){
        player.x -=1
        if( player.x <0){
        player.x = state.screen.width-1
        }
    }
}

const player = state.players[command.playerId]
const Movefunction= acceptedMoves[command.tecla]
const playerId = command.playerId
if(player &&Movefunction){
    Movefunction(player)
    checkFruitCollision(playerId)
    checkPlayerCollision(playerId)
}
}



const checkFruitCollision = (playerId)=>{
const player =state.players[playerId]

for(const fruitId in state.fruits){

const fruit = state.fruits[fruitId]

    if(player.x == fruit.x && player.y == fruit.y){
    removeFruits({fruitId:fruitId})
    player.score +=1
    
    }
}

        
}
const checkPlayerCollision =(playerId)=>{
for(const socketid in state.players){
    const player = state.players[socketid]
    const currentPlayer = state.players[playerId]
    if(socketid !== playerId){
        if(player.x ==currentPlayer.x && player.y == currentPlayer.y){
            removePlayers({playerId:socketid,type:'remove-player',enemyId:playerId})
            currentPlayer.score += 10
        }
    }
}
}


return {
state,
addPlayers,
addfruits,
removeFruits,
removePlayers,
movePlayer,
setState,
subscribe,
start,
checkFruitCollision
}
}