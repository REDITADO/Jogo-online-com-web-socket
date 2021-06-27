import  express  from 'express'
import http from 'http'
import {Server} from 'socket.io'
import createGame from './public/create-game.js'


const app = express()
const server = http.createServer(app)
const io =new Server(server)
const game = new createGame()


game.subscribe((command)=>{
    //console.log(command)
   io.emit(command.type, command)
})
app.use(express.static('public'))

game.start()
io.on('connection',(socket)=>{
    const playerId = socket.id
    game.addPlayers({playerId:playerId})
    
    socket.emit('setup', game.state)
    
    socket.on('disconnect', ()=>{
        game.removePlayers({playerId:playerId,type:'player-left'})
        console.log('player disconnected', playerId)
    })
    socket.on('move-player',command=>{
        console.log(command)
        command.playerId = playerId
        command.type = 'move-player'
        game.movePlayer(command)
    })
})




server.listen(1340)