export default function renderScreen(screen,game, requestAnimationFrame,playerId,scoreTable){
    const ctx = screen.getContext("2d")

    ctx.fillStyle = 'white'
    ctx.clearRect(0,0,10,10)
    
    for ( const playerId in game.state.players){
        const player = game.state.players[playerId]
        ctx.fillStyle = 'lightgray'
        ctx.fillRect(player.x,player.y,1,1)
    }
    for(const fruitId in game.state.fruits){
        ctx.fillStyle = 'red'
        const fruit =game.state.fruits[fruitId]
        ctx.fillRect(fruit.x,fruit.y,1,1)
    }
    const currentPlayer = game.state.players[playerId]
    if(currentPlayer){
        ctx.fillStyle = '#F0DB4F'
        ctx.fillRect(currentPlayer.x,currentPlayer.y,1,1)
    }
    
    updateScoreTable(scoreTable, game,playerId)

    requestAnimationFrame(()=>{
        renderScreen(screen,game, requestAnimationFrame, playerId, scoreTable)
    })
  
    
}



function updateScoreTable(scoreTable, game,playerId){
const maxPlayers = 10
let scoreInnerTable = `
<tr class="header">
   <td>Top 10 players</td>
   <td>pontos</td>
</tr>
`
const playersArray = []
for(const playerId in game.state.players){
    const players = game.state.players[playerId]
    playersArray.push({
        playerId:playerId,
        x:players.x,
        y:players.y,
        score:players.score
    })
}
const playersSorted = playersArray.sort((first,second)=>{
    if(first.score < second.score){
        return 1
    }
    if(first.score > second.score){
        return -1
    }
    return 0
})

const topPlayersScore = playersSorted.slice(0,maxPlayers)

scoreInnerTable = topPlayersScore.reduce((stringFormed, player)=>{
    return stringFormed +`
    <tr ${player.playerId===playerId?'class ="current-player"':''}>
      <td>${player.playerId}</td>
      <td>${player.score}</td>
      </tr>
    `
},scoreInnerTable)

const currentTopPlayer = topPlayersScore[playerId] 

if(currentTopPlayer){
    scoreInnerTable += `
    <tr class="current-player bottom">
    <td class="socket-id">${currentPlayerFromTopScore.id} EU </td>
    <td class="score-value">${currentPlayerFromTopScore.score}</td>
</tr>
    `
}
scoreTable.innerHTML=scoreInnerTable


}
